loadingBarProgressValue = 0;
loadingBar = document.querySelector("#loadingBar");
loadingBarProgress = document.querySelector("#loadingBarProgress");
loadingBlock = document.querySelector("#loadBlock");
loadVideo = document.querySelector("#video");
loadingStep = 0;
loadingStepMax = 3;
loadingVideos = null;
loadingLists = null;
VideoArrowState = false;
ListArrowState = false;
var bgLoop;
var subtitleFile = "";
var subtitleSorted;
var videoBlock = document.querySelector("#videoBlock");
var video = document.querySelector("#video");
var videoFile = document.querySelector("#videoFile");
var videoTitle = document.querySelector("#videoTitle");
var videoFileList = document.querySelector("#fileList");
var videoListBackground = document.querySelector("#blockBackground");
var manageVideoBlock = top.document.querySelector("#manageVideo");
var manageVideoButton = document.querySelector("#openButton");
var manageVideoAddButton = document.querySelector("#addVideo");
var manageVideoRemoveButton = document.querySelector("#removeVideo");
var manageBgBlock = top.document.querySelector("#manageBg");
var manageBgButton = document.querySelector("#openBgButton");
var manageBgAddButton = document.querySelector("#addBg");
var manageBgRemoveButton = document.querySelector("#removeBg");
var videoListLogo = document.querySelector("#blockLogo");
var videoRemoveList = document.querySelector("#removeVideoOptionBlock");
var bgRemoveList = document.querySelector("#removeBgOptionBlock");
var addVideoGame = document.querySelector("#addVideoForm .whichGame");
var removeVideoGame = document.querySelector("#removeVideoForm .whichGame");
var addVideoForm = document.querySelector("#addVideoForm");
var removeVideoForm = document.querySelector("#removeVideoForm");
var removeVideoSubmit = document.querySelector("#ConfirmRemove");
var addVideoSubmit = document.querySelector("#newVideo");
var videoItems = document.querySelectorAll(".videoListItem");
var videoEditItems = document.querySelectorAll("#editVideoFormOption .editDataBlock");
var addBgForm = document.querySelector("#addBgForm");
var removeBgForm = document.querySelector("#removeBgForm");
var removeBgSubmit = document.querySelector("#ConfirmBgRemove");
var addBgSubmit = document.querySelector("#newBg");
var videoMsg = document.querySelector("#videoMsg");
var listMsg = document.querySelector("#listMsg");
var manageListBlock = top.document.querySelector("#manageList");
var manageListButton = document.querySelector("#openListButton");
var manageListAddButton = document.querySelector("#addList");
var removeListGame = document.querySelector("#removeListForm .whichGame");
var addListForm = document.querySelector("#addListForm");
var removeListForm = document.querySelector("#removeListForm");
var manageListRemoveButton = document.querySelector("#removeList");
var closeAddListForm = document.querySelector("#closeAddListForm");
var addListName = document.querySelector("#newListName");
var addListLogo = document.querySelector("#newListLogo");
var addListBg = document.querySelector("#newListBg");
var addListSubmit = document.querySelector("#ConfirmCreate");
var blockContent = document.querySelector("#blockContent");
var videoDetails = document.querySelector("#videoInfo");
var videoTitleArrow = document.querySelector("#videoTitleArrow");
var videoTitleBlock = document.querySelector("#videoTitleBlock");
var listNav = document.querySelector("#listNav");
var listNavBlock = document.querySelector("#listNavBlock");
var videoPlayer = document.querySelector("#videoPlayer");
var videoPlayButton = document.querySelector("#playButton");
var videoMuteButton = document.querySelector("#muteButton");
var videoVolumeButton = document.querySelector("#volumeButton");
var videoCurrentTime = document.querySelector("#videoCurrentTime");
var videoDuration = document.querySelector("#videoDuration");
var videoSeekButton = document.querySelector("#seekButton");
var videoFullscreenButton = document.querySelector("#fullscreenButton");
var volumePlayerBar = document.querySelector("#volumeBar");
var volumePlayerBarLimit = document.querySelector("#volumeProgress");
var videoPlayerBar = document.querySelector("#videoBar");
var videoPlayerBarLimit = document.querySelector("#videoProgress");
var subtitleBlock = document.querySelector("#videoSubtitleBlock");
var subtitleButton = document.querySelector("#subtitleIcon");
var subtitleRemoveButton = document.querySelector("#removeSubtitleIcon");
var subtitleOptionBlock = document.querySelector("#subtitleOptionBlock");
var subtitleOptionButton = document.querySelector("#subtitleOptionButton");
var subtitleOption = document.querySelector("#subtitleOption");
var pageHead = document.querySelector("head");
var videoStyle = document.createElement("style");
var addSubtitleGame = document.querySelector("#addSubtitleForm .whichGame");
var removeSubtitleGame = document.querySelector("#removeSubtitleForm .whichGame");
var addSubtitleForm = document.querySelector("#addSubtitleForm");
var addSubtitleName = document.querySelector("#newSubtitleName");
var addSubtitleSubmit = document.querySelector("#newSubtitle");
var uploadSubtitleButton = document.querySelector("#uploadSubtitleIcon");
var removeSubtitleForm = document.querySelector("#removeSubtitleForm");
var removeSubtitleName = document.querySelector("#removeSubtitleName");
var eraseSubtitleButton = document.querySelector("#removeSubtitleIcon");
var editButton = document.querySelector("#openEdition");
var editionBlock = document.querySelector("#editElems");
var editVideoForm = document.querySelector("#editVideoForm");
var editVideoBlock = document.querySelector("#editVideoBlock");
var editListForm = document.querySelector("#editListForm");
var editListLogoPreview = document.querySelector("#currentLogoPreview");
var editListIconPreview = document.querySelector("#currentIconPreview");
var editListBgPreview = document.querySelector("#currentBgPreview");
var editListIconButton = document.querySelector("#editListIconButton");
var editListData = document.querySelector("#editListData");
var editListName = document.querySelector("#editListName");
var editListOldName = document.querySelector("#editListOldName");
var editVideoIconButton = document.querySelector("#editVideoIconButton");
var editVideoData = document.querySelector("#editVideoData");
var resetVideoEditForm = document.querySelector("#resetVideoEditForm");
var resetListEditForm = document.querySelector("#resetListEditForm");
var confirmVideoEdit = document.querySelector("#ConfirmVideoEdit");
var confirmListEdit = document.querySelector("#ConfirmListEdit");
var editListLogo = document.querySelector("#editListLogo");
var editListIcon = document.querySelector("#editListIcon");
var editListBg = document.querySelector("#editListBg");
var editVideoFormOption = document.querySelector("#editVideoFormOption");
var editVideoGame = document.querySelector("#editVideoForm .whichGame");
var editListGame = document.querySelector("#editListForm .whichGame");
var editListLogoType = document.querySelector("#editListLogoType");
var editListIconType = document.querySelector("#editListIconType");
var editListBgType = document.querySelector("#editListBgType");
var resetRemove = document.querySelector("#resetRemove");
var resetBgRemove = document.querySelector("#resetBgRemove");
var videoSpace = document.querySelector("#video_space");
var listItems = document.querySelectorAll(".changeBlock");
var logoBlock = document.querySelector("#logoBlock");
var bgTab = [];
currentGame = -1;
refreshListTime = 0;
refreshVideoTime = 0;
videoStyle.id = "videoStyle";
pageHead.appendChild(videoStyle);

function loadBar() {
    console.log("LOADBAR");
    loadingBarProgressValue = Math.ceil(((100 * loadingStep) / loadingStepMax));
    loadingBarProgress.style.width = loadingBarProgressValue + "%";
    if (loadingStep >= loadingStepMax) {
        console.log("LOAD COMPLETE");
        endLoading();
    } else {
        console.log("LOAD IN PROGRESS");
    }
}

function loadVideos() {
    if (loadingVideos !== null) {
        console.log("VIDEO LOAD COMPLETE");
        endLoadingVideo();
    } else {
        console.log("VIDEO LOAD IN PROGRESS");
    }
}

function loadLists() {
    if (loadingLists !== null) {
        console.log("LIST LOAD COMPLETE");
        endUpdateList();
    } else {
        console.log("LIST LOAD IN PROGRESS");
    }
}


function config() {

    gameList = [];
    gameVideoList = [];
    gameIndex = 0;
    gameListLimit = 0;
    generateLists();
}

function generateVideos(gameId) {
    loadingVideos = null;
    videoListRequest = new XMLHttpRequest();
    videoListRequest.onload = function() {
        if (this.readyState === 4 && this.status === 200) {
            // Typical action to be performed when the document is ready:
            gameVideoList = [];
            if (videoListRequest.response.links.length > 5) {
                for (var l = 5; l < videoListRequest.response.links.length; l++) {
                    var videoInfo = videoListRequest.response.links[l].href.split(".");
                    var videoInfoTitle = videoListRequest.response.links[l].href.split(".")[0].split(videoListRequest.responseURL)[1];
                    gameVideoList.push({ videoName: videoInfoTitle, videoURL: videoInfo[0] + "." + videoInfo[1], videoType: videoInfo[1]});
                    if (l === (videoListRequest.response.links.length - 1)) {
                        detectSubtitle();
                        console.info("Video List loaded");
                        loadingVideos = true;
                        loadVideos();
                    }
                }
            } else {
                loadingVideos = false;
                loadVideos();
            }
        } else if (this.status === 404) {
            loadingVideos = false;
        loadVideos();
        }
    };
    videoListRequest.ontimeout = function() {
        loadingVideos = false;
        loadVideos();
    };

    var videoLoc = "./data/lists/" + gameList[gameId].config.gameName + "/video/";
    DataRequest(videoLoc, videoListRequest, "GET", "document");

}

function DataRequest(RequestLoc, DataRequest, RequestType, ResponseType) {
    	DataRequest.open(RequestType, RequestLoc, true);
    	DataRequest.responseType = ResponseType;
        DataRequest.timeout = 4000;
    	DataRequest.send();
}

function detectSubtitle () {
    var videoSubtitleCheck = new XMLHttpRequest();
    videoSubtitleCheck.onload = function() {
        if (this.readyState === 4 && this.status === 200) {
            if (videoListRequest.response.links.length > 5) {
                for (var s = 5; s < videoSubtitleCheck.response.links.length; s++) {
                    for (var v = 0; v < gameVideoList.length; v++) {
                        var findVideoTitle = videoSubtitleCheck.response.links[s].href.split(".")[0].split("/")[videoSubtitleCheck.response.links[s].href.split(".")[0].split("/").length-1];
                        if (findVideoTitle === gameVideoList[v].videoName) {
                            gameVideoList[v].subtitleFileName = videoSubtitleCheck.response.links[s].href.split(".")[0]+"."+videoSubtitleCheck.response.links[s].href.split(".")[1];
                        }   
                    }
                    if (s === (videoSubtitleCheck.response.links.length - 1)) {
                        console.info("All Subtitles checked");
                    }
                }
                if (currentList[currentVideo].subtitleFileName) {
                    var subtitleID = currentList[currentVideo].subtitleFileName.split('.');
                    removeSubtitleName.setAttribute("value", currentList[currentVideo].videoName+'.'+ subtitleID[1]);
                    getSubtitle(currentList[currentVideo].subtitleFileName);
                }
            }
        }
    };

    videoSubtitleCheck.ontimeout = function() {
    };

    var videoSubtitleLoc = "./data/lists/" + gameList[currentGame].config.gameName + "/subtitle/";
    DataRequest(videoSubtitleLoc, videoSubtitleCheck, "GET", 'document');
}

function getSubtitle(subtitle) {
    subtitleFile = "";
    subtitleSorted = [];
    var videoSubtitleRequest = new XMLHttpRequest();
    videoSubtitleRequest.onload = function() {
        var subtitleButton = document.querySelector("#subtitleIcon");
        var subtitleRemoveButton = document.querySelector("#removeSubtitleIcon");
        var subtitleOptionBlock = document.querySelector("#subtitleOptionBlock");
        if (this.readyState === 4 && this.status === 200) {
            subtitleFile = JSON.parse(this.responseText);
            subtitleFile.subtitle.sort(function(a, b) {
                return a.startTime - b.startTime;
            });
            subtitleFile.subtitle.forEach(function(item, index) {
                if (index === 0) {
                    subtitleSorted.push([]);
                    subtitleSorted[0].push(item);
                } else {
                    if (item.startTime === subtitleSorted[subtitleSorted.length - 1][0].startTime) {
                        subtitleSorted[subtitleSorted.length - 1].push(item);
                    } else {
                        subtitleSorted.push([]);
                        subtitleSorted[subtitleSorted.length - 1].push(item);
                    }
                }
            });

            console.info("Video Subtitle loaded");
        }
            subtitleButton.classList.remove("hide");
            subtitleRemoveButton.classList.remove("hide");
            subtitleOptionBlock.classList.remove("small");
    };
    videoSubtitleRequest.ontimeout = function() {
        console.error("No Video Subtitle found");
    };

    var videoSubtitleLoc = subtitle;
    DataRequest(videoSubtitleLoc, videoSubtitleRequest, "GET", '');

}

function generateLists(refreshList = false) {
    loadingLists = null;
    var gameListRequest = new XMLHttpRequest();
    gameListRequest.onload = function() {
        if (this.readyState === 4 && this.status === 200) {
            // Typical action to be performed when the document is ready:
            gameList = [];
            gameListLimit = 0;
            if (gameListRequest.response.links.length > 5) {
                for (var l = 5; l < gameListRequest.response.links.length; l++) {
                    var gameInfo = gameListRequest.response.links[l].href.split(gameListRequest.response.baseURI)[1].split("/");
                    listSetting(gameInfo[0], refreshList);
                    gameListLimit++;
                    if (l === (gameListRequest.response.links.length - 1)) {
                        console.info("All Lists found");
                        if (refreshList === true) {
                            loadingLists = true;
                        } else {
                            loadingStep++;
                        }
                        document.querySelector("#manageVideo").classList.remove("hide");
        		editElems.classList.remove("hide");
        		listMsg.classList.add("hide");
                logoBlock.classList.add("hide");
                    }
                }
            } else {
            	console.info("Lists empty");
                if (refreshList === true) {
                    loadingLists = false;
                } else {
                    loadingStep = (loadingStepMax);
                }
                document.querySelector("#manageVideo").classList.add("hide");
        		editElems.classList.add("hide");
        		listMsg.classList.remove("hide");
                logoBlock.classList.remove("hide");
            }
        } else {
            if (refreshList === true) {
                loadingLists = false;
            } else {
                loadingStep = (loadingStepMax);
            }
                document.querySelector("#manageVideo").classList.add("hide");
        		editElems.classList.add("hide");
        		listMsg.classList.remove("hide");
                logoBlock.classList.remove("hide");
        }
        if (loadingBlock) {
            loadBar();
        }
    };
    gameListRequest.ontimeout = function() {
            if (refreshList === true) {
                loadingLists = false;
            } else {
                loadingStep = (loadingStepMax);
            }
    };


    var gameLoc = "./data/lists/";
    DataRequest(gameLoc, gameListRequest, "GET", "document");

}

function listSetting(gameName, refreshList = false) {
    var gameConfigRequest = new XMLHttpRequest();
    gameConfigRequest.onload = function() {
        if (this.readyState === 4 && this.status === 200) {
            // Typical action to be performed when the document is ready:
            if (gameConfigRequest.response.links.length > 5) {
                var gameListBackground = "";
                var gameListLogo = "";
                var gameListIcon = "";
                for (var l = 5; l < gameConfigRequest.response.links.length; l++) {
                    if (gameConfigRequest.response.links[l].href.indexOf("background") !== -1 || gameConfigRequest.response.links[l].href.indexOf("Background") !== -1) {
                        var gameListBackground = gameConfigRequest.response.links[l].href;
                    } else if (gameConfigRequest.response.links[l].href.indexOf("logo") !== -1 || gameConfigRequest.response.links[l].href.indexOf("Logo") !== -1) {
                        var gameListLogo = gameConfigRequest.response.links[l].href;
                    } else if (gameConfigRequest.response.links[l].href.indexOf("icon") !== -1 || gameConfigRequest.response.links[l].href.indexOf("Icon") !== -1) {
                        var gameListIcon = gameConfigRequest.response.links[l].href;
                    }

                    if ((gameListBackground && gameListBackground !== "") && (gameListLogo !== "" && gameListLogo) && (gameListIcon !== "" && gameListIcon)) {
                        gameList.push({ config: { gameName: gameName, gameBackground: gameListBackground, gameLogo: gameListLogo, gameIcon: gameListIcon } });
                        gameListBackground = "";
                        gameListLogo = "";
                        gameListIcon = "";
                        console.info("list '" + gameName + "' generated");
                    }
                    if (l === (gameConfigRequest.response.links.length - 1) && gameList.length === gameListLimit) {
                        console.info("All Lists generated");
                        if (refreshList === true) {
                            loadingLists = true;
                            loadLists();
                        } else {
                            loadingStep = (loadingStepMax);
                        }
                    }

                }
            } else {
            	console.info("List data empty");
            }

        }

        if (loadingBlock) {
            loadBar();
        }
    };
    gameConfigRequest.ontimeout = function() {
        if (refreshList === true) {
            loadingLists = true;
            loadLists();
        } else {
            loadingStep = (loadingStepMax);
        }
    };

    var gameConfigLoc = "./data/lists/" + gameName + "/";
    DataRequest(gameConfigLoc, gameConfigRequest, "GET", "document");
}

function setDefaultBg() {
    var bgRequest = new XMLHttpRequest();
    bgRequest.onload = function() {
        if (this.readyState === 4 && this.status === 200) {
            bgTab = [];
            if (bgRequest.response.links.length > 5) {

                bgRemoveList.innerHTML = "";
                for (var l = 5; l < bgRequest.response.links.length; l++) {
                    bgTab.push(bgRequest.response.links[l].href);
                }

                bgTab.forEach(function(item, index) {
                    var bgRemoveItemBlock = document.createElement("div");
                    bgRemoveItemBlock.setAttribute("class", "removeBgOption");
                    bgRemoveList.appendChild(bgRemoveItemBlock);
                    var bgRemoveItemOption = document.createElement("input");
                    bgRemoveItemOption.setAttribute("type", "checkbox");
                    bgRemoveItemOption.setAttribute("id", "bg" + index);
                    bgRemoveItemOption.setAttribute("name", "bg[]");
                    var imageNameSpliter = item.split("/");
                    bgRemoveItemOption.setAttribute("value", decodeURIComponent(imageNameSpliter[(imageNameSpliter.length-1)]));
                    bgRemoveItemBlock.appendChild(bgRemoveItemOption);
                    bgRemoveItemOption.addEventListener("click", function() {
                        this.classList.toggle("bgTicked");
                        var bgSelected = document.querySelectorAll(".bgTicked");
                        if (bgSelected.length === 0) {
                            removeBgSubmit.classList.add("disabled");
                        } else {
                            removeBgSubmit.classList.remove("disabled");
                        }
                    });
                    var bgRemoveItemOptionLabel = document.createElement("label");
                    bgRemoveItemOptionLabel.setAttribute("for", "bg" + index);
                    var bgRemoveItemPreview = document.createElement("img");
                    bgRemoveItemPreview.src = item;
                    bgRemoveItemPreview.classList.add("bgTabPreview");
                    bgRemoveItemOptionLabel.appendChild(bgRemoveItemPreview);
                    bgRemoveItemBlock.appendChild(bgRemoveItemOptionLabel);
                });


                var bgRand = Math.floor(Math.random() * ((bgRequest.response.links.length - 1) - 5)) + 5;
                var videoListBackground = document.querySelector("#blockBackground");
                videoListBackground.style.backgroundImage = "URL(" + bgRequest.response.links[bgRand].href + ")";
                videoListBackground.style.backgroundRepeat = "no-repeat";
                videoListBackground.style.backgroundColor = "#000000";
                videoListBackground.style.backgroundSize = "contain";

                if (bgTab.length > 1) {
                    bgLoop = setInterval(function() {
                        bgRand = Math.floor(Math.random() * bgTab.length);
                        videoListBackground.style.backgroundImage = "URL(" + bgTab[bgRand] + ")";
                        videoListBackground.style.backgroundRepeat = "no-repeat";
                        videoListBackground.style.backgroundColor = "#000000";
                        videoListBackground.style.backgroundSize = "contain";
                    }, 10000);
                }

                if (bgTab.length > 0) {
        			manageBgRemoveButton.classList.remove("disabled");
        		}
            } else {
            	bgTab = [];
            	var videoListBackground = document.querySelector("#blockBackground");
            	manageBgBlock.classList.remove("removeBgOpened");
        		bgRemoveList.innerHTML = "";
        		videoListBackground.style.cssText = "";
            	if (bgTab.length === 0) {
        			manageBgRemoveButton.classList.add("disabled");
        		} else {
        			manageBgRemoveButton.classList.remove("disabled");
        		}
            }
        } else {
        	bgTab = [];
        	var videoListBackground = document.querySelector("#blockBackground");
        	manageBgBlock.classList.remove("removeBgOpened");
        	bgRemoveList.innerHTML = "";
        	videoListBackground.style.cssText = "";
        	if (bgTab.length === 0) {
        		manageBgRemoveButton.classList.add("disabled");
        	} else {
        		manageBgRemoveButton.classList.remove("disabled");
        	}
        }
    }

    var bgLoc = "./data/background/";
    DataRequest(bgLoc, bgRequest, "GET", "document");
}


function endLoading() {
    init();
    endLoadingList();
}

function endLoadingList() {
    if (!(gameList && gameList.length > 0)) {
        var manageListBlock = top.document.querySelector("#manageList");
        var manageListRemoveButton = document.querySelector("#removeList");
        document.body.classList.remove("loading");
        loadingBlock = null;
        videoBlock.classList.add("hidden");
        videoMsg.classList.add("hide");
        listMsg.classList.remove("hide");
        manageBgBlock.classList.remove("hide");
        manageListRemoveButton.classList.add("disabled");
        manageListBlock.classList.add("opened");
        document.querySelector("#manageVideo").classList.add("hide");
        editElems.classList.add("hide");
        logoBlock.classList.remove("hide");
        console.error("No Lists Found");
        setDefaultBg();
        ListArrowState = false;
    }
}

function endUpdateList() {
    if (gameList && gameList.length > 0) {
        if (bgLoop) {
            clearInterval(bgLoop);
            videoListBackground.style.backgroundImage = "";
            videoListBackground.style.backgroundRepeat = "";
            videoListBackground.style.backgroundColor = "";
            videoListBackground.style.backgroundSize = "";
        }
        manageListRemoveButton.classList.remove("disabled");
        manageListBlock.classList.remove("opened");
		manageBgBlock.classList.add("hide");
        refreshListTime++;
        if (gameList.length > 1 && ListArrowState === false) {
            start();
        } else {
            start(false);
        }
    } else {
        document.body.classList.remove("loading");
        loadingBlock.remove();
        loadingBlock = null;
        videoMsg.classList.add("hide");
        listMsg.classList.remove("hide");
        manageBgBlock.classList.remove("hide");
        videoBlock.classList.add("hidden");
        manageListRemoveButton.classList.add("disabled");
        manageListBlock.classList.add("opened");
        document.querySelector("#manageVideo").classList.add("hide");
        listItems[0].classList.add("hide");
        listItems[1].classList.add("hide");
        editElems.classList.add("hide");
        logoBlock.classList.remove("hide");
        console.error("No Lists Found");
        setDefaultBg();
        start(false);
    }
    refreshList = false;
}

function endLoadingVideo() {
    if (gameVideoList && gameVideoList.length > 0) {
        videoMsg.classList.add("hide");
        if (gameVideoList.length === 1) {
            VideoArrowState = false;
        } else {
            if (VideoArrowState === false) {
                VideoArrowState = true;
                InitArrow();
            }
        }
        currentList = gameVideoList;
        subtitleBlock.innerHTML = "";
        createList();
        video.load();
        addSubtitleName.setAttribute("value", currentList[currentVideo].videoName);
        subtitleFile = "";
        subtitleIndex = 0;
                    subtitleButton.classList.add("hide");
            subtitleRemoveButton.classList.add("hide");
            subtitleOptionBlock.classList.add("small");
        if (currentList[currentVideo].subtitleFileName) {
            var subtitleID = currentList[currentVideo].subtitleFileName.split('.');
            removeSubtitleName.setAttribute("value", currentList[currentVideo].videoName+'.'+ subtitleID[1]);
            getSubtitle(currentList[currentVideo].subtitleFileName);
        }
        editVideoBlock.classList.remove("hide");
    } else {
        VideoArrowState = false;
        subtitleBlock.innerHTML = "";
               videoBlock.classList.add("hidden");
        videoMsg.classList.remove("hide");
        listMsg.classList.add("hide");
        logoBlock.classList.add("hide");
        manageVideoBlock.classList.add("opened");
        editVideoBlock.classList.add("hide");
        editListData.classList.remove("hide");
        listItems[0].classList.add("hide");
            listItems[1].classList.add("hide");
        console.error("No Videos Found");
        if (loadingBlock) {
            document.body.classList.remove("loading");
            loadingBlock.remove();
            loadingBlock = null;
        }
    }
}

function createList() {
    if (currentList && currentList.length > 0) {

        var listItems = document.querySelectorAll(".changeBlock");

        manageVideoRemoveButton.classList.remove("disabled");
        removeVideoForm.classList.remove("disabled");
        videoBlock.classList.remove("hidden");
        manageVideoBlock.classList.remove("opened");
        manageVideoBlock.classList.remove("removeVidOpened");
        if (currentList.length > 1) {
            listItems[0].classList.remove("hide");
            listItems[1].classList.remove("hide");
            videoTitleArrow.classList.remove("hide");
        } else {
            listItems[0].classList.add("hide");
            listItems[1].classList.add("hide");
            videoTitleArrow.classList.add("hide");
        }

        var videoFileName = decodeURIComponent(currentList[currentVideo].videoName.replace(/_/g, " "));
        var videoFileType = currentList[currentVideo].videoType;
        var videoFileURL = currentList[currentVideo].videoURL;
        videoFile.src = videoFileURL;
        videoFile.type = "video/" + videoFileType;
        videoTitle.innerHTML = videoFileName;

        for (var i = 0; i < currentList.length; i++) {
            var videoListItem = document.createElement("p");
            videoListItem.setAttribute("class", "videoListItem");
            videoListItem.innerHTML = "#" + (i + 1) + " : " + decodeURIComponent(currentList[i].videoName.replace(/_/g, " "));
            videoFileList.appendChild(videoListItem);

            var videoRemoveItemBlock = document.createElement("div");
            videoRemoveItemBlock.setAttribute("class", "removeVideoOption");
            videoRemoveList.appendChild(videoRemoveItemBlock);
            var videoRemoveItemOption = document.createElement("input");
            videoRemoveItemOption.setAttribute("type", "checkbox");
            videoRemoveItemOption.setAttribute("id", "video" + i);
            videoRemoveItemOption.setAttribute("name", "video[]");
            videoRemoveItemOption.setAttribute("value", currentList[i].videoName + "." + currentList[i].videoType);
            videoRemoveItemBlock.appendChild(videoRemoveItemOption);
            videoRemoveItemOption.addEventListener("click", function() {
                this.classList.toggle("videoTicked");
                var videoSelected = document.querySelectorAll(".videoTicked");
                if (videoSelected.length === 0) {
                    removeVideoSubmit.classList.add("disabled");
                } else {
                    removeVideoSubmit.classList.remove("disabled");
                }
            });
            var videoRemoveItemOptionLabel = document.createElement("label");
            videoRemoveItemOptionLabel.setAttribute("for", "video" + i);
            videoRemoveItemOptionLabel.innerHTML = "#" + (i + 1) + " : " + decodeURIComponent(currentList[i].videoName.replace(/_/g, " "));
            videoRemoveItemBlock.appendChild(videoRemoveItemOptionLabel);

            var editVideoItemBlock = document.createElement("div");
            editVideoItemBlock.setAttribute("class", "editDataBlock");
            var editVideoItemLabel = document.createElement("label");
            editVideoItemLabel.setAttribute("for", "editVideo" + i);
            editVideoItemLabel.innerHTML = "Video #" + (i + 1) + " name : ";
            var editVideoItemInput = document.createElement("input");
            editVideoItemInput.setAttribute("type", "text");
            editVideoItemInput.setAttribute("id", "editVideo" + i);
            editVideoItemInput.setAttribute("name", "editVideoName[]");
            editVideoItemInput.setAttribute("pattern", "[a-zA-Z0-9\s]+");
            editVideoItemInput.setAttribute("placeholder", decodeURIComponent(currentList[i].videoName.replace(/_/g, " ")));
            editVideoItemInput.addEventListener("change", function() {
                if (this.value === "") {
                    this.classList.remove("videoEdited");
                } else {
                    this.classList.add("videoEdited");
                }
                var videoEdited = document.querySelectorAll(".videoEdited");
                if (videoEdited.length === 0) {
                    confirmVideoEdit.classList.add("disabled");
                    resetVideoEditForm.classList.add("disabled");
                } else {
                    confirmVideoEdit.classList.remove("disabled");
                    resetVideoEditForm.classList.remove("disabled");
                }
            });
            var editVideoItemOldInput = document.createElement("input");
            editVideoItemOldInput.setAttribute("type", "text");
            editVideoItemOldInput.setAttribute("id", "editVideoOldName" + i);
            editVideoItemOldInput.setAttribute("class", "oldData");
            editVideoItemOldInput.setAttribute("name", "editVideoOldName[]");
            editVideoItemOldInput.setAttribute("value", currentList[i].videoName + "." + currentList[i].videoType);

            editVideoItemBlock.appendChild(editVideoItemLabel);
            editVideoItemBlock.appendChild(editVideoItemInput);
            editVideoItemBlock.appendChild(editVideoItemOldInput);
            editVideoFormOption.appendChild(editVideoItemBlock);

        }

        videoItems = document.querySelectorAll(".videoListItem");
        videoItems.forEach(SwitchVideo);
        videoItems[currentVideo].classList.add("active");
        videoEditItems = document.querySelectorAll("#editVideoFormOption .editDataBlock");
        videoEditItems[currentVideo].classList.add("active");
        videoBlock.classList.remove("hidden");
        manageVideoBlock.classList.remove("opened");
        manageVideoRemoveButton.classList.remove("disabled");

    } else {
        videoBlock.classList.add("hidden");
        manageVideoBlock.classList.add("opened");
        manageVideoRemoveButton.classList.add("disabled");
    }
}

function SwitchVideo(item, index) {
    item.addEventListener("click", function() {
        if (currentVideo !== index) {
            video.pause();
            for (var j = 0; j < videoItems.length; j++) {
                videoItems[j].classList.remove("active");
                videoEditItems[j].classList.remove("active");
            }
            subtitleBlock.innerHTML = "";
            currentVideo = index;
            videoCurrentItem = videoItems[currentVideo];
            videoCurrentItem.classList.add("active");
            videoEditCurrentItem = videoEditItems[currentVideo];
            videoEditCurrentItem.classList.add("active");
            videoFileName = decodeURIComponent(currentList[currentVideo].videoName.replace(/_/g, " "));
            videoFileType = currentList[currentVideo].videoType;
            videoFileURL = currentList[currentVideo].videoURL;
            videoFile.src = videoFileURL;
            videoFile.type = "video/" + videoFileType;
            videoTitle.innerHTML = videoFileName;
            video.load();
            video.play();
            subtitleOptionBlock.classList.remove("open");
            subtitleOption.classList.add("hide");
            addSubtitleName.setAttribute("value", currentList[currentVideo].videoName);
            subtitleFile = "";
            subtitleIndex = 0;
                        subtitleButton.classList.add("hide");
            subtitleRemoveButton.classList.add("hide");
            subtitleOptionBlock.classList.add("small");
            if (currentList[currentVideo].subtitleFileName) {
                var subtitleID = currentList[currentVideo].subtitleFileName.split('.');
                removeSubtitleName.setAttribute("value", currentList[currentVideo].videoName+'.'+ subtitleID[1]);
                getSubtitle(currentList[currentVideo].subtitleFileName);
            }
        }
    });
}

function SwitchList(currentGame, init = false) {
    var currentGameName = "";
    var currentBackground = "";
    var currentLogo = "";
    var navButtonActiveGroup = document.querySelectorAll("[id^='gameSelect_']");
    var navButtonActive = document.querySelector("#gameSelect_" + currentGame);
    if (gameList.length > 0) {
        currentGameName = gameList[currentGame].config.gameName;
        currentBackground = gameList[currentGame].config.gameBackground;
        currentLogo = gameList[currentGame].config.gameLogo;
        currentIcon = gameList[currentGame].config.gameIcon;
        var refreshListCache = "";
        if (init === false) {
            if (refreshListTime < 10) {
                refreshListCache = "?0" + refreshListTime;
            } else {
                refreshListCache = "?" + refreshListTime;
            }
        }
        videoListLogo.src = currentLogo + refreshListCache;
        videoStyle.innerHTML = "#blockBackground {background-image: url('" + currentBackground + refreshListCache + "')}";
        editListLogoPreview.setAttribute("src", currentLogo + refreshListCache);
        editListIconPreview.setAttribute("src", currentIcon + refreshListCache);
        editListBgPreview.setAttribute("src", currentBackground + refreshListCache);
        editListName.setAttribute("placeholder", decodeURIComponent(currentGameName).replace(/_/g, " "));
        editListOldName.setAttribute("value", currentGameName);
        editListLogoType.setAttribute("value", currentLogo.split(".")[1].split("?")[0]);
        editListIconType.setAttribute("value", currentIcon.split(".")[1].split("?")[0]);
        editListBgType.setAttribute("value", currentBackground.split(".")[1].split("?")[0]);
    } else {
        videoListLogo.src = currentLogo;
        videoStyle.innerHTML = "";
    }

    if (gameList.length > 1) {
        listNav.classList.remove("hide");

    } else {
        listNav.classList.add("hide");
    }

    addVideoGame.setAttribute("value", currentGameName);
    removeVideoGame.setAttribute("value", currentGameName);
    removeListGame.setAttribute("value", currentGameName);
    addSubtitleGame.setAttribute("value", currentGameName);
    removeSubtitleGame.setAttribute("value", currentGameName);
    editVideoGame.setAttribute("value", currentGameName);
    editListGame.setAttribute("value", currentGameName);
    for (var l = 0; l < navButtonActiveGroup.length; l++) {
        navButtonActiveGroup[l].classList.remove("listActive");
    }
    var tipsGroup = document.querySelectorAll(".listNameText");
    for (var m = 0; m < tipsGroup.length; m++) {
        tipsGroup[m].innerHTML = "'" + decodeURIComponent(currentGameName).replace(/_/g, " ") + "'";
    }
    if (navButtonActive) {
        navButtonActive.classList.add("listActive");
    }

    editElems.classList.remove("opened");
    showVideoList();
    if (loadingBlock) {
        console.info("Video list ready");
    }
}

/************/
function start(init = true) {
    console.log(gameList);
    if (gameList && gameList.length > 0) {
        var randGame = Math.floor(Math.random() * gameList.length);
        console.log("randGame : " + randGame);
        currentGame = randGame;
        var randVideo = Math.floor(Math.random() * gameVideoList.length);
        console.log("randVideo : " + randVideo);
        var currentVideo = randVideo;
        if (init === true && ListArrowState === false) {
            InitListArrow();
            ListArrowState = true;
            //InitArrow();
        }
        generateListIcons();
        SwitchList(currentGame, init);
    } else {
        videoListLogo.src = "";
        videoListBackground.style.cssText = "";
        videoStyle.innerHTML = "";
    }
}

function generateListIcons() {
    var navButtonActiveGroup = document.querySelectorAll(".gameSelectBlock");
    if (navButtonActiveGroup && navButtonActiveGroup.length > 0) {
        for (var j = 0; j < navButtonActiveGroup.length; j++) {
            navButtonActiveGroup[j].remove();
        }
    }
    for (var j = 0; j < gameList.length; j++) {
        var listIconBlock = document.createElement("div");
        listIconBlock.setAttribute("class", "gameSelectBlock");
        var listIconTips = document.createElement("div");
        listIconTips.setAttribute("class", "tips");
        var listIconTipsText = document.createElement("span");
        listIconTips.innerHTML = "Go to the list '" + decodeURIComponent(gameList[j].config.gameName.replace(/_/g, " ")) + "'";
        var listIcon = document.createElement("img");
        listIcon.setAttribute("id", "gameSelect_" + j);
        listIcon.setAttribute("class", "gameSelect");
        listIcon.setAttribute("src", gameList[j].config.gameIcon);
        listIcon.addEventListener("click", function() {
            if (this.classList.contains("disabled") === false && this.classList.contains("listActive") === false && listNavBlock.classList.contains("dragging") === false) {
                var listActivated = document.querySelector(".listActive");
                if (listActivated) {
                    listActivated.classList.remove("listActive");
                }
                this.classList.add("listActive");
                console.log("TEST gameID " + this.id.split("_")[1]);
                currentGame = parseInt(this.id.split("_")[1]);
                console.log("TEST curentGame " + currentGame);
                listNavBlock.style.left = "";
                SwitchList(currentGame, true);
            }
        });

        listNavBlock.appendChild(listIconBlock);
        listIconBlock.appendChild(listIcon);
        listIconBlock.appendChild(listIconTips);
        listIconTips.appendChild(listIconTipsText);
    }
}

function AdaptArrow() {
    var listItems = document.querySelectorAll(".changeBlock");

    listItems[0].style.height = video.offsetHeight + "px";
    listItems[0].style.left = "calc((100% - " + video.offsetWidth + "px)/2)";
    listItems[0].style.marginLeft = "-" + listItems[0].offsetWidth + "px";
    listItems[1].style.height = video.offsetHeight + "px";
    listItems[1].style.right = "calc((100% - " + video.offsetWidth + "px)/2)";
    listItems[1].style.marginRight = "-" + listItems[1].offsetWidth + "px";
    videoMsg.style.height = video.offsetHeight + "px";
    videoMsg.style.width = video.offsetWidth + "px";
    videoDetails.style.transform = "translateY(-" + (video.offsetHeight) + "px)";
    videoDetails.style.width = video.offsetWidth + "px";
    videoFileList.style.width = video.offsetWidth + "px";
    listNav.style.width = video.offsetWidth + "px";
    videoPlayer.style.width = video.offsetWidth + "px";

    videoPlayerBarLimit.style.width = (seekButton.offsetWidth - 10) + "px";
    videoSpace.style.height = video.offsetHeight + "px";
}

function InitArrow() {
    var listItems = document.querySelectorAll(".changeBlock");

    listItems[0].addEventListener("click", function() {
        if (this.classList.contains("disabled") === false) {
            videoItems[currentVideo].classList.remove("active");
            videoEditItems[currentVideo].classList.remove("active");
            if (currentVideo === 0) {
                currentVideo = (currentList.length - 1);
            } else {
                currentVideo--;
            }
            ChangeVideo(currentVideo);
        }
    });

    listItems[1].addEventListener("click", function() {
        if (this.classList.contains("disabled") === false) {
            videoItems[currentVideo].classList.remove("active");
            videoEditItems[currentVideo].classList.remove("active");
            if (currentVideo === (currentList.length - 1)) {
                currentVideo = 0;
            } else {
                currentVideo++;
            }
            ChangeVideo(currentVideo);
        }
    });

    VideoArrowState = true;

    AdaptArrow();

}

function InitListArrow() {
    var listItems = document.querySelectorAll(".changeList");

    listItems[0].addEventListener("click", function() {
        if (this.classList.contains("disabled") === false) {
            if (currentGame === 0) {
                currentGame = (gameList.length - 1);
            } else {
                currentGame--;
            }
            listNavBlock.style.left = "";
            SwitchList(currentGame);
        }
    });

    listItems[1].addEventListener("click", function() {
        if (this.classList.contains("disabled") === false) {
            if (currentGame === (gameList.length - 1)) {
                currentGame = 0;
            } else {
                currentGame++;
            }
            listNavBlock.style.left = "";
            SwitchList(currentGame);
        }
    });
}

function showVideoList() {
    currentVideo = 0;
    subtitleFile = "";
    subtitleIndex = 0;
                subtitleButton.classList.add("hide");
            subtitleRemoveButton.classList.add("hide");
            subtitleOptionBlock.classList.add("small");
    video.pause();
    videoFileList.innerHTML = "";
    videoRemoveList.innerHTML = "";
    editVideoFormOption.innerHTML = "";
    confirmVideoEdit.classList.add("disabled");

    manageVideoRemoveButton.classList.add("disabled");
    removeVideoForm.classList.add("disabled");
    videoBlock.classList.add("hidden");
    manageVideoBlock.classList.remove("removeVidOpened");
    videoMsg.classList.add("hide");
    var listItems = document.querySelectorAll(".changeBlock");
    listItems[0].classList.add("hide");
    listItems[1].classList.add("hide");


    generateVideos(currentGame);
}

function ChangeVideo(videoID) {
    subtitleBlock.innerHTML = "";
    videoItems[videoID].classList.add("active");
    videoEditItems[videoID].classList.add("active");
    videoFileName = decodeURIComponent(currentList[videoID].videoName.replace(/_/g, " "));
    videoFileType = currentList[videoID].videoType;
    videoFileURL = currentList[videoID].videoURL;
    videoFile.src = videoFileURL;
    videoFile.type = "video/" + videoFileType;
    videoTitle.innerHTML = videoFileName;
    video.load();
    videoFileList.scrollTo(0, currentVideo * 29);
    if (videoDetails.classList.contains("play") === true) {
        video.play();
    }
    subtitleOptionBlock.classList.remove("open");
    subtitleOption.classList.add("hide");
    addSubtitleName.setAttribute("value", currentList[currentVideo].videoName);
    subtitleFile = "";
    subtitleIndex = 0;
                subtitleButton.classList.add("hide");
            subtitleRemoveButton.classList.add("hide");
            subtitleOptionBlock.classList.add("small");
    if (currentList[videoID].subtitleFileName) {
        var subtitleID = currentList[videoID].subtitleFileName.split('.');
        removeSubtitleName.setAttribute("value", currentList[videoID].videoName+'.'+ subtitleID[1]);
        getSubtitle(currentList[videoID].subtitleFileName);
    }
}



function init() {
    var subtitleIndex = 0;
    var addListLogoState = false;
    var addListBgState = false;
    loadingForms = null;

    function sendForm(form, updateElem, updateType) {
        loadingForms = null;
        notifElem = top.document.querySelector("#notifications");
        changeBlockLeft = top.document.querySelector(".changeBlock.buttonLeft");
        changeBlockRight = top.document.querySelector(".changeBlock.buttonRight");
        changeListBlock = top.document.querySelectorAll(".changeList");
        gameSelectBlock = top.document.querySelectorAll(".gameSelect");
        gameSelectBlock.forEach(function(item) {
            item.classList.add("disabled");
        });
        changeBlockRight.classList.add("disabled");
        changeBlockLeft.classList.add("disabled");
        changeListBlock[0].classList.add("disabled");
        changeListBlock[1].classList.add("disabled");
        formRequest = new XMLHttpRequest();
        formRequest.onload = function() {
            if (formRequest.readyState == 4 && formRequest.status == 200) {
                console.log("Response Received");
                notifElem.innerHTML = formRequest.responseText;
                loadingForms = true;
            } else {
                loadingForms = false;
            }
            loadForm(updateType);
        };
        formData = new FormData(form);
        formRequest.open("POST", "./src/edit.php", true);
        formRequest.send(formData);


    }

    function loadForm(updateType) {
        if (loadingForms !== null) {
            console.log("FORM RECEIVED COMPLETE");
            endFormReceive(updateType);
        } else {
            console.log("FORM SEND IN PROGRESS");
        }
    }

    function endFormReceive(updateType) {
        showNotif();
        if (updateType === "list") {
            RefreshGame();
        }
        if (updateType === "video") {
            RefreshList();
        }
        if (updateType === "subtitle") {
            subtitleFile = "";
        	subtitleBlock.innerHTML = "";
            subtitleIndex = 0;
                        subtitleButton.classList.add("hide");
            subtitleRemoveButton.classList.add("hide");
            subtitleOptionBlock.classList.add("small");
            delete currentList[currentVideo].subtitleFileName;
            detectSubtitle();
        }
        if (updateType === "bg") {
        	clearInterval(bgLoop);
        	setDefaultBg();
        }
    }

    function showNotif() {
        notifElem.classList.add("active");
        changeBlockRight.classList.remove("disabled");
        changeBlockLeft.classList.remove("disabled");
        changeListBlock[0].classList.remove("disabled");
        changeListBlock[1].classList.remove("disabled");
        gameSelectBlock.forEach(function(item) {
            item.classList.remove("disabled");
        });
        setTimeout(function() {
            notifElem.classList.remove("active");
        }, 10000);
    }


    video.addEventListener("click", function() {
        if (this.paused === true) {
            this.play();
            subtitleOptionBlock.classList.remove("open");
            subtitleOption.classList.add("hide");
            videoFileList.classList.remove("show");
            videoTitleArrow.classList.remove("upside");
        } else {
            this.pause();
        }
    });

    video.addEventListener("canplay", function() {
        var videoDurationMin = Math.floor(video.duration / 60);
        var videoDurationSec = Math.floor(video.duration % 60);
        var videoCurrentMin = Math.floor(video.currentTime / 60);
        var videoCurrentSec = Math.floor(video.currentTime % 60);
        if (videoCurrentMin < 10) {
            videoCurrentMin = "0" + videoCurrentMin;
        }
        if (videoCurrentSec < 10) {
            videoCurrentSec = "0" + videoCurrentSec;
        }
        videoCurrentTime.innerHTML = videoCurrentMin + ":" + videoCurrentSec;
        if (videoDurationMin < 10) {
            videoDurationMin = "0" + videoDurationMin;
        }
        if (videoDurationSec < 10) {
            videoDurationSec = "0" + videoDurationSec;
        }
        videoDuration.innerHTML = videoDurationMin + ":" + videoDurationSec;
        seekButton.setAttribute("max", video.duration);
        AdaptArrow();
        if (loadingBlock) {
            document.body.classList.remove("loading");
            loadingBlock.remove();
            loadingBlock = null;
        }
        console.info("Video ready");
    });


    video.addEventListener("timeupdate", function() {
        var videoCurrentMin = Math.floor(video.currentTime / 60);
        var videoCurrentSec = Math.floor(video.currentTime % 60);
        if (videoCurrentMin < 10) {
            videoCurrentMin = "0" + videoCurrentMin;
        }
        if (videoCurrentSec < 10) {
            videoCurrentSec = "0" + videoCurrentSec;
        }
        videoCurrentTime.innerHTML = videoCurrentMin + ":" + videoCurrentSec;
        seekButton.value = video.currentTime;
        var videoProgress = ((seekButton.value * 100) / video.duration);
        videoPlayerBar.style.cssText = "width:" + videoProgress + "%";
        if (subtitleFile && subtitleFile.subtitle.length > 0) {
            for (var s = 0; s < subtitleSorted.length; s++) {
                subtitleSorted[s].forEach(function(item, index) {
                    //console.log(item);
                    var videoSubtitle = top.document.querySelector("#videoSubtitle" + s + "-" + index);
                    if (Math.floor(video.currentTime) >= item.startTime && Math.floor(video.currentTime) < item.endTime) {
                        if (!videoSubtitle) {
                            videoSubtitle = document.createElement("span");
                            videoSubtitle.setAttribute("class", "videoSubtitle");
                            videoSubtitle.id = "videoSubtitle" + s + "-" + index;
                            subtitleBlock.appendChild(videoSubtitle);
                            videoSubtitle.innerHTML = item.text;
                            if (item.color) {
                                videoSubtitle.style.color = item.color;
                            }
                        }
                    } else if (Math.floor(video.currentTime) === item.endTime) {
                        if (videoSubtitle) {
                            videoSubtitle.remove();
                        }
                    }
                });
            }
        }
    });

    seekButton.addEventListener("change", function() {
        video.currentTime = seekButton.value;
        if (subtitleFile !== "") {
            var videoSubtitles = top.document.querySelectorAll(".videoSubtitle");
            if (videoSubtitles) {
                videoSubtitles.forEach(function(item) {
                    item.remove();
                });
            }
        }
    });

    videoPlayButton.addEventListener("click", function() {
        if (video.paused === true) {
            video.play();
        } else {
            video.pause();
        }
    });

    videoMuteButton.addEventListener("click", function() {
        if (video.muted === true) {
            video.muted = false;
            videoPlayer.classList.remove("mute");
            video.volume = videoVolumeButton.value;
        } else {
            video.muted = true;
            videoPlayer.classList.add("mute");
        }
    });

    videoVolumeButton.addEventListener("change", function() {
        video.volume = videoVolumeButton.value;
        var videoVolumeProgress = ((videoVolumeButton.value * 100));
        volumePlayerBar.style.cssText = "width:" + videoVolumeProgress + "%";
        if (video.volume > 0) {
            video.muted = false;
            videoPlayer.classList.remove("mute");
        } else {
            video.muted = true;
            videoPlayer.classList.add("mute");
        }
    });

    videoFullscreenButton.addEventListener("click", function() {
        if (videoBlock.classList.contains("fullscreen") === true) {
            document.exitFullscreen();
            videoBlock.classList.remove("fullscreen");
        } else {
            videoBlock.requestFullscreen();
            videoBlock.classList.add("fullscreen");
        }
    });

    subtitleButton.addEventListener("click", function() {
        subtitleBlock.classList.toggle("hide");
        subtitleOption.classList.toggle("subOff");
    });

    subtitleOptionButton.addEventListener("click", function() {
        subtitleOptionBlock.classList.toggle("open");
        subtitleOption.classList.toggle("hide");
    });


    function RefreshList() {

        video.pause();
        videoMsg.classList.add("hide");
    	gameVideoList = [];
    	videoRemoveList.innerHTML = "";
    	manageVideo.classList.remove("removeVidOpened");
    	manageVideo.classList.remove("opened");
    	removeVideoSubmit.classList.add("disabled");
    	manageVideoRemoveButton.classList.add("disabled");
    	videoFileList.classList.remove("open");
    	videoFileList.innerHTML = "";
    	editVideoFormOption.innerHTML = "";
    	subtitleBlock.innerHTML = "";
    	editionBlock.classList.remove("opened");
    	editListForm.reset();
        if (gameVideoList && gameVideoList.length === 0) {
            videoBlock.classList.add("hidden");
            videoMsg.classList.remove("hide");
            editVideoBlock.classList.add("hide");
            var listItems = document.querySelectorAll(".changeBlock");
            listItems[0].classList.add("hide");
            listItems[1].classList.add("hide");
        }

        generateVideos(currentGame);

    };

    function RefreshGame() {
        refreshList = true;
        var manageListBlock = top.document.querySelector("#manageList");
        var manageListRemoveButton = document.querySelector("#removeList");
        var listItems = document.querySelectorAll(".changeBlock");
        gameList = [];
        currentGame = -1;
        video.pause();
        videoFile.src = "";
        manageListBlock.classList.remove("opened");
        manageListBlock.classList.remove("addListOpened");
        videoMsg.classList.add("hide");
        manageBgBlock.classList.remove("hide");
        videoBlock.classList.remove("hide");
        editListForm.reset();
        videoListBackground.style.cssText = "";
        videoListLogo.src = "";
        videoStyle.innerHTML = "";
        addListSubmit.classList.add("disabled");
        manageListRemoveButton.classList.add("disabled");
        editionBlock.classList.remove("opened");
    	editVideoForm.reset();
                listItems[0].classList.add("hide");
        listItems[1].classList.add("hide");

        if (gameVideoList && gameVideoList.length > 0) {
            videoBlock.classList.add("hidden");
            gameVideoList = [];
        }

        generateLists(true);

    };




    video.addEventListener("pause", function() {
        videoDetails.classList.remove("play");
        videoPlayer.classList.remove("play");
        if (video.ended === true) {
            subtitleBlock.innerHTML = "";
            if (currentList.length === 1) {
                video.play();
                subtitleFile = "";
                subtitleIndex = 0;
                            subtitleButton.classList.add("hide");
            subtitleRemoveButton.classList.add("hide");
            subtitleOptionBlock.classList.add("small");
            } else {
                videoItems[currentVideo].classList.remove("active");
                videoEditItems[currentVideo].classList.remove("active");
                if (currentVideo < (currentList.length - 1)) {
                    currentVideo++;
                } else {
                    currentVideo = 0;
                }
                videoItems[currentVideo].classList.add("active");
                videoEditItems[currentVideo].classList.add("active");
                videoFileName = decodeURIComponent(currentList[currentVideo].videoName.replace(/_/g, " "));
                videoFileType = currentList[currentVideo].videoType;
                videoFileURL = currentList[currentVideo].videoURL;
                videoFile.src = videoFileURL;
                videoFile.type = "video/" + videoFileType;
                videoTitle.innerHTML = videoFileName;
                video.load();
                video.play();
                videoFileList.scrollTo(0, currentVideo * 29);
                addSubtitleName.setAttribute("value", currentList[currentVideo].videoName);
                subtitleFile = "";
                subtitleIndex = 0;
                            subtitleButton.classList.add("hide");
            subtitleRemoveButton.classList.add("hide");
            subtitleOptionBlock.classList.add("small");
                if (currentList[currentVideo].subtitleFileName) {
                    var subtitleID = currentList[currentVideo].subtitleFileName.split('.');
                    removeSubtitleName.setAttribute("value", currentList[currentVideo].videoName+'.'+ subtitleID[1]);
                    getSubtitle(currentList[currentVideo].subtitleFileName);
                }
            }
        }
    });
    video.addEventListener("play", function() {
        videoDetails.classList.add("play");
        videoPlayer.classList.add("play");
    });

    window.addEventListener("resize", AdaptArrow);

    manageVideoButton.addEventListener("click", function() {
        manageVideoBlock.classList.toggle("opened");
        removeVideoForm.reset();
        manageVideoBlock.classList.remove("removeVidOpened");
        editElems.classList.remove("opened");
        manageList.classList.remove("opened");
        manageBgBlock.classList.remove("opened");
        var vidSelected = document.querySelectorAll(".videoTicked");
        vidSelected.forEach(function (item) {
            item.classList.remove("videoTicked");
        });
        removeVideoSubmit.classList.add("disabled");
    });

    manageListButton.addEventListener("click", function() {
        manageListBlock.classList.toggle("opened");
        addListForm.reset();
        manageListBlock.classList.remove("addListOpened");
        editElems.classList.remove("opened");
        manageVideo.classList.remove("opened");
        manageBgBlock.classList.remove("opened");
    });

    manageBgButton.addEventListener("click", function() {
        manageBgBlock.classList.toggle("opened");
        removeBgForm.reset();
        manageBgBlock.classList.remove("removeBgOpened");
        editElems.classList.remove("opened");
        manageList.classList.remove("opened");
        manageVideo.classList.remove("opened");
        var bgSelected = document.querySelectorAll(".bgTicked");
        bgSelected.forEach(function (item) {
            item.classList.remove("bgTicked");
        });
        removeBgSubmit.classList.add("disabled");
    });

    manageVideoAddButton.addEventListener("click", function() {
        var uploadVideo = document.querySelector("#newVideo");
        uploadVideo.click();
    });

    manageVideoRemoveButton.addEventListener("click", function() {
        if (this.classList.contains("disabled") === false) {
            var manageVideoBlock = document.querySelector("#manageVideo");
            manageVideoBlock.classList.toggle("removeVidOpened");
            removeVideoForm.classList.remove("hide");
            var customStyle = document.querySelector("#customStyle");
            if (!customStyle) {
                var customStyle = document.createElement("style");
                customStyle.id = "customStyle";
            }
            removeVideoForm.reset();
            var videoSelected = document.querySelectorAll(".videoTicked");
        	videoSelected.forEach(function (item) {
            	item.classList.remove("videoTicked");
        	});
            removeVideoSubmit.classList.add("disabled");
        }
    });

    resetRemove.addEventListener("click", function() {
        if (this.classList.contains("disabled") === false) {
            manageVideoBlock.classList.remove("removeVidOpened");
            removeVideoForm.reset();
            var videoSelected = document.querySelectorAll(".videoTicked");
        	videoSelected.forEach(function (item) {
            	item.classList.remove("videoTicked");
        	});
            removeVideoSubmit.classList.add("disabled");
        }
    });

    removeVideoSubmit.addEventListener("click", function(event) {
        if (this.classList.contains("disabled") === false) {
            sendForm(removeVideoForm, gameVideoList, "video");
            event.preventDefault();
        }
    });

    addVideoSubmit.addEventListener("change", function(event) {
        if (this.classList.contains("disabled") === false) {
            sendForm(addVideoForm, gameVideoList, "video");
            event.preventDefault();
        }
    });

    manageListAddButton.addEventListener("click", function() {
        if (this.classList.contains("disabled") === false) {
            var manageListBlock = document.querySelector("#manageList");
            manageListBlock.classList.toggle("addListOpened");
            addListForm.reset();
        }
    });

    closeAddListForm.addEventListener("click", function() {
        if (this.classList.contains("disabled") === false) {
            var manageListBlock = document.querySelector("#manageList");
            manageListBlock.classList.toggle("addListOpened");
            addListForm.reset();
        }
    });

    manageListRemoveButton.addEventListener("click", function() {
        if (this.classList.contains("disabled") === false) {
            var removeList = confirm("Are you sure to want remove the list '" + gameList[currentGame].config.gameName.replace(/_/g, " ") + "' ? The videos from this list will be removed");
            if (removeList === true) {
                sendForm(removeListForm, gameList, "list");
            }
        }
    });

    addListName.addEventListener("change", function() {
        if (addListName.value !== "") {
            if (addListLogoState && addListBgState) {
                addListSubmit.classList.remove("disabled");
            } else {
                addListSubmit.classList.add("disabled");
            }

        } else {
            addListSubmit.classList.add("disabled");
        }
    });

    addListLogo.addEventListener("change", function() {
        addListLogoState = true;
        if (addListName.value !== "" && addListBgState) {
            addListSubmit.classList.remove("disabled");
        } else {
            addListSubmit.classList.add("disabled");
        }
    });

    addListBg.addEventListener("change", function() {
        addListBgState = true;
        if (addListName.value !== "" && addListLogoState) {
            addListSubmit.classList.remove("disabled");
        } else {
            addListSubmit.classList.add("disabled");
        }
    });

    addListSubmit.addEventListener("click", function() {
        if (this.classList.contains("disabled") === false) {
            sendForm(addListForm, gameList, "list");
        }
    });

    manageBgAddButton.addEventListener("click", function() {
        var uploadBg = document.querySelector("#newBg");
        uploadBg.click();
    });

    manageBgRemoveButton.addEventListener("click", function() {
        if (this.classList.contains("disabled") === false) {
            var manageBgBlock = document.querySelector("#manageBg");
            manageBgBlock.classList.toggle("removeBgOpened");
            var customStyle = document.querySelector("#customStyle");
            if (!customStyle) {
                var customStyle = document.createElement("style");
                customStyle.id = "customStyle";
            }
            removeBgForm.reset();
                    var bgSelected = document.querySelectorAll(".bgTicked");
        bgSelected.forEach(function (item) {
            item.classList.remove("bgTicked");
        });
            removeBgSubmit.classList.add("disabled");
        }
    });

    resetBgRemove.addEventListener("click", function() {
        if (this.classList.contains("disabled") === false) {
            manageBgBlock.classList.remove("removeBgOpened");
            removeBgForm.reset();
                    var bgSelected = document.querySelectorAll(".bgTicked");
        bgSelected.forEach(function (item) {
            item.classList.remove("bgTicked");
        });
            removeBgSubmit.classList.add("disabled");
        }
    });

    removeBgSubmit.addEventListener("click", function(event) {
        if (this.classList.contains("disabled") === false) {
            removeBgSubmit.classList.add("disabled");
            sendForm(removeBgForm, bgTab, "bg");
            event.preventDefault();
        }
    });

    addBgSubmit.addEventListener("change", function(event) {
        if (this.classList.contains("disabled") === false) {
            sendForm(addBgForm, bgTab, "bg");
            event.preventDefault();
        }
    });


    uploadSubtitleButton.addEventListener("click", function() {
        if (this.classList.contains("disabled") === false) {
            var uploadSubtitle = document.querySelector("#newSubtitle");
            uploadSubtitle.click();
        }
    });

    eraseSubtitleButton.addEventListener("click", function() {
        if (this.classList.contains("disabled") === false) {
            var removeSubtitle = confirm("Are you sure you want to delete the subtitle file ?");
            if (removeSubtitle) {
                sendForm(removeSubtitleForm, subtitleFile, "subtitle");
            }
        }
    });

    addSubtitleSubmit.addEventListener("change", function(event) {
        if (this.classList.contains("disabled") === false) {
            if (subtitleFile !== "") {
                var addSubtitle = confirm("A subtitle file already exist for the video '" + currentList[currentVideo].videoName + "'. Are you sure to upload the new subtitle file ?");
                if (addSubtitle === true) {
                    sendForm(addSubtitleForm, subtitleFile, "subtitle");
                }
            } else {
                sendForm(addSubtitleForm, subtitleFile, "subtitle");
            }
            event.preventDefault();
        }
    });

    editButton.addEventListener("click", function() {
        editionBlock.classList.toggle("opened");
        editVideoForm.reset();
        editListForm.reset();
        editListLogo.classList.remove("listEdited");
        editListIcon.classList.remove("listEdited");
        editListBg.classList.remove("listEdited");
        confirmListEdit.classList.add("disabled");
        manageList.classList.remove("opened");
        manageVideo.classList.remove("opened");
        var videoEdited = document.querySelectorAll(".videoEdited");
        videoEdited.forEach(function (item) {
        	item.classList.remove("videoEdited");
        });
        var listEdited = document.querySelectorAll(".listEdited");
        listEdited.forEach(function (item) {
        	item.classList.remove("listEdited");
        });
        confirmVideoEdit.classList.add("disabled");
        resetVideoEditForm.classList.add("disabled");
    });

    editListIconButton.addEventListener("click", function() {
        if (editVideoBlock.classList.contains("hide") === false) {
            editListData.classList.toggle("hide");
            editListForm.reset();
            editListLogo.classList.remove("listEdited");
            editListIcon.classList.remove("listEdited");
            editListBg.classList.remove("listEdited");
            editListName.classList.remove("listEdited");
            confirmListEdit.classList.add("disabled");
            resetListEditForm.classList.add("disabled");
        }
    });

    editVideoIconButton.addEventListener("click", function() {
        editVideoData.classList.toggle("hide");
            editVideoForm.reset();
            confirmVideoEdit.classList.add("disabled");
            resetVideoEditForm.classList.add("disabled");
            var videoEdited = document.querySelectorAll(".videoEdited");
        	videoEdited.forEach(function (item) {
        		item.classList.remove("videoEdited");
        	});
    });

    resetVideoEditForm.addEventListener("click", function() {
        if (this.classList.contains("disabled") === false) {
            editVideoForm.reset();
            confirmVideoEdit.classList.add("disabled");
            resetVideoEditForm.classList.add("disabled");
            var videoEdited = document.querySelectorAll(".videoEdited");
        	videoEdited.forEach(function (item) {
        		item.classList.remove("videoEdited");
        	});
        }
    });

    resetListEditForm.addEventListener("click", function() {
        if (this.classList.contains("disabled") === false) {
            editListForm.reset();
            editListLogo.classList.remove("listEdited");
            editListIcon.classList.remove("listEdited");
            editListBg.classList.remove("listEdited");
            editListName.classList.remove("listEdited");
            confirmListEdit.classList.add("disabled");
            resetListEditForm.classList.add("disabled");
        }
    });

    confirmVideoEdit.addEventListener("click", function() {
        if (this.classList.contains("disabled") === false) {
            sendForm(editVideoForm, gameVideoList, "video");
        }
    });

    confirmListEdit.addEventListener("click", function() {
        if (this.classList.contains("disabled") === false) {
            sendForm(editListForm, gameList, "list");
        }
    });

    editListName.addEventListener("change", function() {
        if (this.value === "") {
            this.classList.remove("listEdited");
        } else {
            this.classList.add("listEdited");
        }
        var listEdited = document.querySelectorAll(".listEdited");
        if (listEdited.length > 0) {
            confirmListEdit.classList.remove("disabled");
            resetListEditForm.classList.remove("disabled");
        } else {
            confirmListEdit.classList.add("disabled");
            resetListEditForm.classList.add("disabled");
        }
    });

    editListLogo.addEventListener("change", function() {
        this.classList.add("listEdited");
        confirmListEdit.classList.remove("disabled");
        resetListEditForm.classList.remove("disabled");
    });

    editListIcon.addEventListener("change", function() {
        this.classList.add("listEdited");
        confirmListEdit.classList.remove("disabled");
        resetListEditForm.classList.remove("disabled");
    });

    editListBg.addEventListener("change", function() {
        this.classList.add("listEdited");
        confirmListEdit.classList.remove("disabled");
        resetListEditForm.classList.remove("disabled");
    });

    videoTitleBlock.addEventListener("click", function() {
        if (currentList.length > 1) {
            if (videoFileList.classList.contains("show") === true) {
                videoFileList.classList.remove("show");
                videoTitleArrow.classList.remove("upside");
            } else {
                videoFileList.classList.add("show");
                videoTitleArrow.classList.add("upside");
            }
        }
    });

    videoDetails.addEventListener("mouseout", function(e) {
        const element = document.getElementById("videoInfo");
        const cssObj = window.getComputedStyle(element, null);

        let videoInfoOpacity = cssObj.getPropertyValue("opacity");
        if (parseInt(videoInfoOpacity) === 0) {
            videoFileList.classList.remove("show");
            videoTitleArrow.classList.remove("upside");
        }
    });

    videoPlayer.addEventListener("mouseout", function() {
        const element = document.getElementById("videoPlayer");
        const cssObj = window.getComputedStyle(element, null);

        let playerOpacity = cssObj.getPropertyValue("opacity");
        //console.log("playerOpacity : "+playerOpacity);
        if (parseInt(playerOpacity) === 0) {
            subtitleOptionBlock.classList.remove("open");
            subtitleOption.classList.add("hide");
        }
    });


    start();
}

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    var slider = document.getElementById("listNavSlider");
    if (document.getElementById(elmnt.id)) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id).onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        //pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        listNavBlock.classList.add("dragging");
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        //pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        //pos4 = e.clientY;
        // set the element's new position:
        //elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        //console.log(e);
        if (e.target.classList.contains("gameSelect") === true) {
            var newposX = (elmnt.offsetLeft - pos1);
            if (newposX < -256) {
                newposX = -256;
            } else if (newposX > (slider.offsetWidth - 128)) {
                newposX = (slider.offsetWidth - 128);
            }
            elmnt.style.left = newposX + "px";
        } else {
            closeDragElement();
        }
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        setTimeout(function() {
            listNavBlock.classList.remove("dragging");
        }, 300);
    }
}

config();
//Make the DIV element draggagle:
dragElement(document.getElementById("listNavBlock"));