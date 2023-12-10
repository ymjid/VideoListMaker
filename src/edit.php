<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
	<style>
		#notifications {color:white; word-break: break-word;}
		#notifications p:not(.separator) {word-break: break-word; margin: 0px;}
		.msg > p:not(:last-child) {border-bottom: 1px solid rgba(255,255,255,0.3);
padding-bottom: 10px;}
		.msg > p:not(:first-child) {padding-top: 10px;}
		.error {color:red;}
		.success {color:lawngreen;}
		.separator {border-top: 1px solid white; margin: 10px;}
	</style>
</head>
<body>
<?php 
$videoError = [false, false];
$imgError = [false, false];
$subtitleError = false;

function rmdir_recursive($dir) {
    foreach(scandir($dir) as $file) {
        if ('.' === $file || '..' === $file) continue;
        if (is_dir("$dir/$file")) rmdir_recursive("$dir/$file");
        else unlink("$dir/$file");
    }
    rmdir($dir);
}

function dir_is_empty($dir) {
  $handle = opendir($dir);
  while (false !== ($entry = readdir($handle))) {
    if ($entry != "." && $entry != "..") {
      closedir($handle);
      return FALSE;
    }
  }

  closedir($handle);
  return TRUE;
}



function return_bytes($val) {
    if (empty($val)) {
        $val = 0;
    }
    $val = trim($val);
    $last = strtolower($val[strlen($val)-1]);
    $val = floatval($val);
    switch($last) {
        // The 'G' modifier is available since PHP 5.1.0
        case 'g':
            $val *= (1024 * 1024 * 1024); //1073741824
            break;
        case 'm':
            $val *= (1024 * 1024); //1048576
            break;
        case 'k':
            $val *= 1024;
            break;
    }

    return $val;
}

function listGlobalApproval($listApproval) {
	foreach($listApproval as $state) {
        if ($state === false) {
        	return false;
        }
    };
    return true;
}

	function stripAccents($string) {
    return strtr(utf8_decode($string), utf8_decode('àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ'), 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY');
}


echo "<div class='msg'>";
	if (isset($_FILES["newVideo"]) && !empty($_FILES["newVideo"])) {
		if (is_uploaded_file($_FILES["newVideo"]["tmp_name"])) {
			$convString = stripAccents($_POST["game"]);
		$gameSan = filter_var($convString, FILTER_SANITIZE_STRING);
		$gameSan = str_replace(" ", "_", $gameSan);
		$videoDir = "../data/lists/".$gameSan."/video/";
		$newNameFile = str_replace(" ", "_", $_FILES["newVideo"]["name"]);
		$newNameFile = str_replace("\xc2\xa0", "_", $newNameFile);
		$newNameFile = preg_replace('/[^a-zA-Z0-9_ %\[\]\.\(\)%&-]/s', '', $newNameFile);
		$newFile = $videoDir.basename($newNameFile);
		$newFiletmp = $videoDir.basename($_FILES["newVideo"]["tmp_name"]);
		$newFileType = strtolower(pathinfo($newFile,PATHINFO_EXTENSION));
		$newFileMimeType = mime_content_type($_FILES['newVideo']['tmp_name']);
		$maxVideoFileLimit = return_bytes(ini_get('upload_max_filesize'));
		if (($newFileType === "webm" && $newFileMimeType === "video/webm") || ($newFileType === "mp4" && $newFileMimeType === "video/mp4")) {
			if (file_exists($newFile)) {
            echo "<p class='error'>".$_FILES["newVideo"]["name"]." already exists.</p>";
			} else if ($_FILES["newVideo"]["size"] > $maxVideoFileLimit) {
            echo "<p class='error'>".$_FILES["newVideo"]["name"]." file size exceed the max file size limit</p>";
            $videoError[1] = true;
			} else {
				if ( !file_exists( $videoDir ) && !is_dir( $videoDir ) ) {
    				mkdir( $videoDir );       
				} 
		   	move_uploaded_file($_FILES["newVideo"]["tmp_name"], $newFile);
		      echo "<p class='success'>".$_FILES["newVideo"]["name"]." have been uploaded successfully</p>";
			}
		}
		else {
         echo "<p class='error'>".$_FILES["newVideo"]["name"]." video format is not supported</p>";
         $videoError[0] = true;
		}
		}
	}

if (isset($_POST) && !empty($_POST)) {
	if (isset($_POST["video"])) {
		$convString = stripAccents($_POST["game"]);
		$gameSan = filter_var($convString, FILTER_SANITIZE_STRING);
		$gameSan = str_replace(" ", "_", $gameSan);
      $videoDir = "../data/lists/".$gameSan."/video/";
      $subtitleDir = "../data/lists/".$gameSan."/subtitle/";
      $hasSubtitle = false;
      for ($i=0; $i < sizeof($_POST["video"]); $i++) {
      	$convString = stripAccents($_POST["video"][$i]);
      	$deleteVideoSan = filter_var($convString, FILTER_SANITIZE_STRING);
         $deleteVideo =unlink($videoDir.$deleteVideoSan);
         $subtitleName = explode(".", $deleteVideoSan);
         if ((file_exists( $subtitleDir )) || (is_dir($subtitleDir) && file_exists($subtitleDir.$subtitleName[0].".txt")) ) {
				$deleteSubtitle =unlink($subtitleDir.$subtitleName[0].".txt");
				$hasSubtitle = true;
		} else if ((file_exists( $subtitleDir )) || (is_dir($subtitleDir) && file_exists($subtitleDir.$subtitleName[0].".json")) ) {
				$deleteSubtitle =unlink($subtitleDir.$subtitleName[0].".json");
				$hasSubtitle = true;
		}
         if ($deleteVideo) {
            echo "<p class='success'>".$deleteVideoSan." deleted</p>";
            if ($hasSubtitle === true && $deleteSubtitle) {
            	echo "<p class='success'>".$subtitleName[0].".txt deleted</p>";
         	}
         }
      }
      if (dir_is_empty($videoDir)) {
      	rmdir($videoDir);
      }
      if ($hasSubtitle === true && dir_is_empty($subtitleDir)) {
      	rmdir($subtitleDir);
      }
	} else if (isset($_POST["removeGame"])) {
		$gameDir = "../data/lists/";
		$convString = stripAccents($_POST["removeGame"]);
		$gameSan = filter_var($convString, FILTER_SANITIZE_STRING);
		$gameSan = str_replace(" ", "_", $gameSan);

		if (file_exists($gameDir.$gameSan)) {
			$deleteList = rmdir_recursive($gameDir.$gameSan);
			if (dir_is_empty($gameDir)) {
      			rmdir($gameDir);
      		}
			echo "<p class='success'>".$gameSan." deleted</p>";
		}
		else {
			echo "<p class='error'>".$gameSan." can not be deleted because it doesn't exists</p>";
		}

	} else if (isset($_POST["newListName"])) {
		$gameDir = "../data/lists/";
		$listApproval = [false, false, false];
		$convString = stripAccents($_POST["newListName"]);
		$newNameSan = filter_var($convString, FILTER_SANITIZE_STRING);
		$maxImgFileLimit = return_bytes(ini_get('upload_max_filesize'));
		if (file_exists($newNameSan)) {
    		echo "<p class='error'>The directory ".$newNameSan." already exists</p>";
		} else {
			$newNameDir = str_replace(" ", "_", $newNameSan);
			$newNameDir = str_replace("\xc2\xa0", "_", $newNameDir);
			$newNameDir = preg_replace('/[^a-zA-Z0-9_ %\[\]\.\(\)%&-]/s', '', $newNameDir);
        if (isset($_FILES["newListLogo"]) && !empty($_FILES["newListLogo"])) {
        	if (is_uploaded_file($_FILES["newListLogo"]["tmp_name"])) {
        	$newFilePath = $_FILES["newListLogo"]["name"];
        	$newFileType = strtolower(pathinfo($newFilePath,PATHINFO_EXTENSION));
        	$newFileMimeType = mime_content_type($_FILES['newListLogo']['tmp_name']);
        	$newNameFile = $newNameSan."_logo";
			$newFile = $gameDir.$newNameDir."/".basename($newNameFile.".".$newFileType);
			$newFiletmp = $gameDir.$newNameDir."/".basename($_FILES["newListLogo"]["tmp_name"]);
			if (($newFileType === "gif" && $newFileMimeType === "image/gif") || ($newFileType === "png" && $newFileMimeType === "image/png") || ($newFileType === "jpg" && $newFileMimeType === "image/jpeg") || ($newFileType === "svg" && $newFileMimeType === "image/svg") || ($newFileType === "jpeg" && $newFileMimeType === "image/jpeg")) {
				if ($_FILES["newListLogo"]["size"] > $maxImgFileLimit) {
            		echo "<p class='error'>".$_FILES["newListLogo"]["name"]." file size exceed the max file size limit</p>";
            		$imgError[1] = true;
				} else {
					$newLogoFile = $newFile;
					$listApproval[0] = true;
				}
			}
			else {
				echo "<p class='error'>".$_FILES["newListLogo"]["name"]." image format is not supported</p>";
				$imgError[0] = true;
			}
		}
        }
        if (isset($_FILES["newListBg"]) && !empty($_FILES["newListBg"])) {
        	if (is_uploaded_file($_FILES["newListBg"]["tmp_name"])) {
        	$newFilePath = $_FILES["newListBg"]["name"];
        	$newFileType = strtolower(pathinfo($newFilePath,PATHINFO_EXTENSION));
        	$newFileMimeType = mime_content_type($_FILES['newListBg']['tmp_name']);
        	$newNameFile = $newNameSan."_background";
			$newFile = $gameDir.$newNameDir."/".basename($newNameFile.".".$newFileType);
			$newFiletmp = $gameDir.$newNameDir."/".basename($_FILES["newListBg"]["tmp_name"]);
			if (($newFileType === "gif" && $newFileMimeType === "image/gif") || ($newFileType === "png" && $newFileMimeType === "image/png") || ($newFileType === "jpg" && $newFileMimeType === "image/jpeg") || ($newFileType === "svg" && $newFileMimeType === "image/svg") || ($newFileType === "jpeg" && $newFileMimeType === "image/jpeg")) {
				if ($_FILES["newListBg"]["size"] > $maxImgFileLimit) {
            		echo "<p>".$_FILES["newListBg"]["name"]." file size exceed the max file size limit</p>";
            		$imgError[1] = true;
				} else {
					$newBgFile = $newFile;
					$listApproval[1] = true;
				}
			}
			else {
				echo "<p class='error'>".$_FILES["newListBg"]["name"]." image format is not supported</p>";
				$imgError[0] = true;
			}
		}
        }
        if (isset($_FILES["newListIcon"]) && !empty($_FILES["newListIcon"])) {
        	if (is_uploaded_file($_FILES["newListIcon"]["tmp_name"])) {
        	$newFilePath = $_FILES["newListIcon"]["name"];
        	$newFileType = strtolower(pathinfo($newFilePath,PATHINFO_EXTENSION));
        	$newFileMimeType = mime_content_type($_FILES['newListIcon']['tmp_name']);
        	$newNameFile = $newNameSan."_icon";
			$newFile = $gameDir.$newNameDir."/".basename($newNameFile.".".$newFileType);
			$newFiletmp = $gameDir.$newNameDir."/".basename($_FILES["newListIcon"]["tmp_name"]);
			if (($newFileType === "gif" && $newFileMimeType === "image/gif") || ($newFileType === "png" && $newFileMimeType === "image/png") || ($newFileType === "jpg" && $newFileMimeType === "image/jpeg") || ($newFileType === "svg" && $newFileMimeType === "image/svg") || ($newFileType === "jpeg" && $newFileMimeType === "image/jpeg")) {
				if ($_FILES["newListIcon"]["size"] > $maxImgFileLimit) {
            		echo "<p class='error'>".$_FILES["newListIcon"]["name"]." file size exceed the max file size limit</p>";
            		$imgError[1] = true;
				} else {
					$newIconFile = $newFile;
					$listApproval[2] = true;
				}
			}
			else {
				echo "<p class='error'>".$_FILES["newListIcon"]["name"]." image format is not supported</p>";
				$imgError[0] = true;
			}
		}
        }

        $globalApproval = listGlobalApproval($listApproval);
        if ($globalApproval === true) {
        	if ( !file_exists( $gameDir ) && !is_dir( $gameDir ) ) {
    			mkdir( $gameDir );       
			} 
			mkdir($gameDir.$newNameDir);
        	move_uploaded_file($_FILES["newListLogo"]["tmp_name"], $newLogoFile);
		    echo "<p class='success'>".$_FILES["newListLogo"]["name"]." have been uploaded successfully</p>";
		    move_uploaded_file($_FILES["newListBg"]["tmp_name"], $newBgFile);
		    echo "<p class='success'>".$_FILES["newListBg"]["name"]." have been uploaded successfully</p>";
		    move_uploaded_file($_FILES["newListIcon"]["tmp_name"], $newIconFile);
		    echo "<p class='success'>".$_FILES["newListIcon"]["name"]." have been uploaded successfully</p>";
        } else {
        	echo "<p class='error'>The list '".$newNameSan."' can be created</p>";
        }
    }
	} else if (isset($_FILES["newSubtitle"]) && !empty($_FILES["newSubtitle"])) {
		if (is_uploaded_file($_FILES["newSubtitle"]["tmp_name"])) {
			$convString = stripAccents($_POST["game"]);
			$gameSan = filter_var($convString, FILTER_SANITIZE_STRING);
			$gameSan = str_replace(" ", "_", $gameSan);
		    $gameDir = "../data/lists/";
		    $subtitleDir = $gameDir.$gameSan."/subtitle/";
		    if ( !file_exists( $subtitleDir ) && !is_dir( $subtitleDir ) ) {
				mkdir($gameDir.$gameSan."/subtitle");
		    }
		    $newFilePath = $_FILES["newSubtitle"]["name"];
        	$newFileType = strtolower(pathinfo($newFilePath,PATHINFO_EXTENSION));
        	$newFileMimeType = mime_content_type($_FILES['newSubtitle']['tmp_name']);
        	$convString = stripAccents($_POST["newSubtitleName"]);
        	$newSubtitleNameSan = filter_var($convString, FILTER_SANITIZE_STRING);
        	$newNameFile = $newSubtitleNameSan;
			$newFile = $subtitleDir.basename($newNameFile.".".$newFileType);
			$newFiletmp = $subtitleDir.basename($_FILES["newSubtitle"]["tmp_name"]);
			if (($newFileType === "txt" && $newFileMimeType === "application/json") || ($newFileType === "json" && $newFileMimeType === "application/json") || ($newFileType === "txt" && $newFileMimeType === "text/plain")) {
				move_uploaded_file($_FILES["newSubtitle"]["tmp_name"], $newFile);
		      	echo "<p class='success'>".$_FILES["newSubtitle"]["name"]." have been uploaded successfully</p>";
			} else {
				echo "<p class='error'>".$_FILES["newSubtitle"]["name"]." format is not supported</p>";
				$subtitleError = true;
			}
		}
	} else if (isset($_POST["removeSubtitleName"])) {
		$convString = stripAccents($_POST["game"]);
		$gameSan = filter_var($gameSan, FILTER_SANITIZE_STRING);
		$gameSan = str_replace(" ", "_", $gameSan);
		$subtitleDir = "../data/lists/".$gameSan."/subtitle/";
		$convString = stripAccents($_POST["removeSubtitleName"]);
		$removeSubtitleName = filter_var($convString, FILTER_SANITIZE_STRING);
		$deleteSubtitle =unlink($subtitleDir.$removeSubtitleName);
         if ($deleteSubtitle) {
            echo "<p class='success'>".$removeSubtitleName." deleted</p>";
         }
         if (dir_is_empty($subtitleDir)) {
      		rmdir($subtitleDir);
      	}
	}
	if (isset($_POST["editVideoName"])) {
		$convString = stripAccents($_POST["game"]);
		$gameSan = filter_var($convString, FILTER_SANITIZE_STRING);
		$gameSan = str_replace(" ", "_", $gameSan);
      $videoDir = "../data/lists/".$gameSan."/video/";
      $subtitleDir = "../data/lists/".$gameSan."/subtitle/";

      for ($i=0; $i < sizeof($_POST["editVideoName"]); $i++) {
      	$convString = stripAccents($_POST["editVideoOldName"][$i]);
      	 $oldNameSan = filter_var($convString, FILTER_SANITIZE_STRING);
      	 $oldfilename = explode('.',$oldNameSan);
      	 $convString = stripAccents($_POST["editVideoName"][$i]);
      	 $filenameSan = filter_var($convString, FILTER_SANITIZE_STRING);
      	 $filename = str_replace(" ", "_", $filenameSan);
         if (file_exists($videoDir.$filenameSan.".".$oldfilename[1]) === false && $filenameSan !== "") {
         	$renameVideo = rename($videoDir.$oldNameSan, $videoDir.$filename.".".$oldfilename[1]);
         	if ($renameVideo) {
         		echo "<p class='success'>".$oldfilename[0]." have been renamed to ".$filename."</p>";
         		if (file_exists($subtitleDir.$oldfilename[0].".txt") === true) {
         			$renameSubtitle = rename($subtitleDir.$oldfilename[0].".txt", $subtitleDir.$filename.".txt");
         			if ($renameSubtitle) {
                    	echo "<p class='success'>".$oldfilename[0]." file subtitle have been renamed to ".$filename."</p>";
         			}
         		}
         	} else {
                echo "<p class='error'>".$oldfilename[0]." can not be renamed</p>";
         	}
         }
      }
	}
	if (isset($_POST["editListName"]) || isset($_FILES["editListLogo"]) || isset($_FILES["editListIcon"]) || isset($_FILES["editListBg"])) {
		$gameDir = "../data/lists/";
		$maxImgFileLimit = return_bytes(ini_get('upload_max_filesize'));
		$convString = stripAccents($_POST["editListName"]);
		$editListName = filter_var($convString, FILTER_SANITIZE_STRING);
		$editListName = str_replace(" ", "_", $editListName);
		$convString = stripAccents($_POST["editListOldName"]);
		$editListOldName = filter_var($convString, FILTER_SANITIZE_STRING);
		$convString = stripAccents($_POST["editListLogoType"]);
		$editListLogoType = filter_var($convString, FILTER_SANITIZE_STRING);
		$convString = stripAccents($_POST["editListBgType"]);
		$editListBgType = filter_var($convString, FILTER_SANITIZE_STRING);
		$convString = stripAccents($_POST["editListIconType"]);
		$editListIconType = filter_var($convString, FILTER_SANITIZE_STRING);
		if (file_exists($gameDir.$editListName) === false && $editListName !== "") {
			$renameLogo = rename($gameDir.$editListOldName."/".$editListOldName."_logo".".".$editListLogoType, $gameDir.$editListOldName."/".$editListName."_logo".".".$editListLogoType);
			if ($renameLogo) {
				echo "<p class='success'>The image '".$editListOldName."_logo' have been renamed to '".$editListName."_logo'</p>";
			}
			$renameBg = rename($gameDir.$editListOldName."/".$editListOldName."_background".".".$editListBgType, $gameDir.$editListOldName."/".$editListName."_background".".".$editListBgType);
			if ($renameBg) {
				echo "<p class='success'>The image '".$editListOldName."_background' have been renamed to '".$editListName."_background'</p>";
			}
			$renameIcon = rename($gameDir.$editListOldName."/".$editListOldName."_icon".".".$editListIconType, $gameDir.$editListOldName."/".$editListName."_icon".".".$editListIconType);
			if ($renameIcon) {
				echo "<p class='success'>The image '".$editListOldName."_icon' have been renamed to '".$editListName."_icon'</p>";
			}
			$renameDir = rename($gameDir.$editListOldName, $gameDir.$editListName);
			if ($renameDir) {
				echo "<p class='success'>The list '".$editListOldName."' have been renamed to '".$editListName."'</p>";
			}
		} else {
			if (file_exists($gameDir.$editListName) === true && $editListName !== "") {
			echo "<p class='error'>The directory ".$editListName." already exists</p>";
			}
		}
        
		if (isset($_FILES["editListLogo"]) && !empty($_FILES["editListLogo"]) && $_FILES["editListLogo"]["error"] === 0) {
			if (is_uploaded_file($_FILES["editListLogo"]["tmp_name"])) {
				$convString = stripAccents($_POST["editListName"]);
			$editListName = filter_var($convString, FILTER_SANITIZE_STRING);
			$convString = stripAccents($_POST["editListOldName"]);
			$editListOldName = filter_var($convString, FILTER_SANITIZE_STRING);
        	$newFilePath = $_FILES["editListLogo"]["name"];
        	$newFileType = strtolower(pathinfo($newFilePath,PATHINFO_EXTENSION));
        	$newFileMimeType = mime_content_type($_FILES['editListLogo']['tmp_name']);
        	if (isset($_POST["editListName"]) && $editListName !== "" && $editListName !== $editListOldName) {
        		$listName = $editListName;
        	}
        	else {
				$listName = $editListOldName;
        	}
        	$newNameFile = $listName."_logo";
			$newFile = $gameDir.$listName."/".basename($newNameFile.".".$newFileType);
			$newFiletmp = $gameDir.$listName."/".basename($_FILES["editListLogo"]["tmp_name"]);
			if (($newFileType === "gif" && $newFileMimeType === "image/gif") || ($newFileType === "png" && $newFileMimeType === "image/png") || ($newFileType === "jpg" && $newFileMimeType === "image/jpeg") || ($newFileType === "svg" && $newFileMimeType === "image/svg") || ($newFileType === "jpeg" && $newFileMimeType === "image/jpeg")) {
				if ($_FILES["editListLogo"]["size"] > $maxImgFileLimit) {
            		echo "<p class='error'>".$_FILES["editListLogo"]["name"]." file size exceed the max file size limit</p>";
            		$imgError[1] = true;
				} else {
					$convString = stripAccents($_POST["editListLogoType"]);
					$editListLogoType = filter_var($convString, FILTER_SANITIZE_STRING);
					unlink($gameDir.$listName."/".$listName."_logo".".".$editListLogoType);
		   			move_uploaded_file($_FILES["editListLogo"]["tmp_name"], $newFile);
		      	echo "<p class='success'>".$_FILES["editListLogo"]["name"]." have been uploaded successfully</p>";
				}
			}
			else {
				echo "<p class='error'>".$_FILES["editListLogo"]["name"]." image format is not supported</p>";
				$imgError[0] = true;
			}
		}
        }

        if (isset($_FILES["editListBg"]) && !empty($_FILES["editListBg"])  && $_FILES["editListBg"]["error"] === 0) {
        	if (is_uploaded_file($_FILES["editListBg"]["tmp_name"])) {
        		$convString = stripAccents($_POST["editListName"]);
        		$editListName = filter_var($convString, FILTER_SANITIZE_STRING);
        		$convString = stripAccents($_POST["editListOldName"]);
			$editListOldName = filter_var($convString, FILTER_SANITIZE_STRING);
        	$newFilePath = $_FILES["editListBg"]["name"];
        	$newFileType = strtolower(pathinfo($newFilePath,PATHINFO_EXTENSION));
        	$newFileMimeType = mime_content_type($_FILES['editListBg']['tmp_name']);
        	if (isset($_POST["editListName"]) && $editListName !== "" && $editListName !== $editListOldName) {
        		$listName = $editListName;
        	}
        	else {
				$listName = $editListOldName;
        	}
        	$newNameFile = $listName."_background";
			$newFile = $gameDir.$listName."/".basename($newNameFile.".".$newFileType);
			$newFiletmp = $gameDir.$listName."/".basename($_FILES["editListBg"]["tmp_name"]);
			if (($newFileType === "gif" && $newFileMimeType === "image/gif") || ($newFileType === "png" && $newFileMimeType === "image/png") || ($newFileType === "jpg" && $newFileMimeType === "image/jpeg") || ($newFileType === "svg" && $newFileMimeType === "image/svg") || ($newFileType === "jpeg" && $newFileMimeType === "image/jpeg")) {
				if ($_FILES["editListBg"]["size"] > $maxImgFileLimit) {
            		echo "<p class='error'>".$_FILES["editListBg"]["name"]." file size exceed the max file size limit</p>";
            		$imgError[1] = true;
				} else {
					$convString = stripAccents($_POST["editListBgType"]);
					$editListBgType = filter_var($convString, FILTER_SANITIZE_STRING);
					unlink($gameDir.$listName."/".$listName."_background".".".$editListBgType);
		   			move_uploaded_file($_FILES["editListBg"]["tmp_name"], $newFile);
		      	echo "<p class='success'>".$_FILES["editListBg"]["name"]." have been uploaded successfully</p>";
				}
			}
			else {
				echo "<p class='error'>".$_FILES["editListBg"]["name"]." image format is not supported</p>";
				$imgError[0] = true;
			}
		}
        }

        if (isset($_FILES["editListIcon"]) && !empty($_FILES["editListIcon"])  && $_FILES["editListIcon"]["error"] === 0) {
        	if (is_uploaded_file($_FILES["editListIcon"]["tmp_name"])) {
        		$convString = stripAccents($_POST["editListName"]);
        	$editListName = filter_var($convString, FILTER_SANITIZE_STRING);
        	$convString = stripAccents($_POST["editListOldName"]);
			$editListOldName = filter_var($convString, FILTER_SANITIZE_STRING);
        	$newFilePath = $_FILES["editListIcon"]["name"];
        	$newFileType = strtolower(pathinfo($newFilePath,PATHINFO_EXTENSION));
        	$newFileMimeType = mime_content_type($_FILES['editListIcon']['tmp_name']);
 			if (isset($_POST["editListName"]) && $editListName !== "" && $editListName !== $editListOldName) {
        		$listName = $editListName;
        	}
        	else {
				$listName = $editListOldName;
        	}
        	$newNameFile = $listName."_icon";
			$newFile = $gameDir.$listName."/".basename($newNameFile.".".$newFileType);
			$newFiletmp = $gameDir.$listName."/".basename($_FILES["editListIcon"]["tmp_name"]);
			if (($newFileType === "gif" && $newFileMimeType === "image/gif") || ($newFileType === "png" && $newFileMimeType === "image/png") || ($newFileType === "jpg" && $newFileMimeType === "image/jpeg") || ($newFileType === "svg" && $newFileMimeType === "image/svg") || ($newFileType === "jpeg" && $newFileMimeType === "image/jpeg")) {
				if ($_FILES["editListIcon"]["size"] > $maxImgFileLimit) {
            		echo "<p class='error'>".$_FILES["editListIcon"]["name"]." file size exceed the max file size limit</p>";
            		$imgError[1] = true;
				} else {
					$convString = stripAccents($_POST["editListIconType"]);
					$editListIconType = filter_var($convString, FILTER_SANITIZE_STRING);
					unlink($gameDir.$listName."/".$listName."_icon".".".$editListIconType);
		   			move_uploaded_file($_FILES["editListIcon"]["tmp_name"], $newFile);
		      		echo "<p class='success'>".$_FILES["editListIcon"]["name"]." have been uploaded successfully</p>";
				}
			}
			else {
				echo "<p class='error'>".$_FILES["editListIcon"]["name"]." image format is not supported</p>";
				$imgError[0] = true;
			}
		}
        }

	}
}

	if (isset($_FILES["newBg"]) && !empty($_FILES["newBg"])) {
		if (is_uploaded_file($_FILES["newBg"]["tmp_name"])) {
			$bgDir = "../data/background/";
			if ( !file_exists( $bgDir ) && !is_dir( $bgDir ) ) {
    			mkdir( $bgDir );       
			} 
			$maxImgFileLimit = return_bytes(ini_get('upload_max_filesize'));
			$newFilePath = $_FILES["newBg"]["name"];
        	$newFileType = strtolower(pathinfo($newFilePath,PATHINFO_EXTENSION));
        	$newFileMimeType = mime_content_type($_FILES['newBg']['tmp_name']);
        	$newNameFile = explode(".", $_FILES["newBg"]["name"]);
			$newFile = $bgDir."/".basename($newNameFile[0].".".$newFileType);
			if (($newFileType === "gif" && $newFileMimeType === "image/gif") || ($newFileType === "png" && $newFileMimeType === "image/png") || ($newFileType === "jpg" && $newFileMimeType === "image/jpeg") || ($newFileType === "svg" && $newFileMimeType === "image/svg") || ($newFileType === "jpeg" && $newFileMimeType === "image/jpeg")) {
				if ($_FILES["newBg"]["size"] > $maxImgFileLimit) {
            		echo "<p>".$_FILES["newBg"]["name"]." file size exceed the max file size limit</p>";
            		$imgError[1] = true;
				} else {
		   			move_uploaded_file($_FILES["newBg"]["tmp_name"], $newFile);
		      	echo "<p class='success'>".$_FILES["newBg"]["name"]." have been uploaded successfully</p>";
				}
			}
			else {
				echo "<p class='error'>".$_FILES["newBg"]["name"]." image format is not supported</p>";
				$imgError[0] = true;
			}
		}
	}
	if (isset($_POST["bg"])) {
      $bgDir = "../data/background/";
      //echo $videoDir." ";
      for ($i=0; $i < sizeof($_POST["bg"]); $i++) {
      	$convString = stripAccents($_POST["bg"][$i]);
      	$deleteBgSan = filter_var($convString, FILTER_SANITIZE_STRING);
         $deleteBg =unlink($bgDir.$deleteBgSan);
         if ($deleteBg) {
            echo "<p class='success'>".$deleteBgSan." deleted</p>";
         }
      }
      if (dir_is_empty($bgDir)) {
      	rmdir($bgDir);
      }
	}
echo "</div>";

		if ($videoError[0] === true || $videoError[1] === true || $imgError[0] === true || $imgError[1] === true || $subtitleError === true) {
			echo "<p class='separator'></p>";
			echo "<div class='info'>";
        	if ($videoError[0] === true) {
        	  echo "<p>The video format supported are webm & mp4</p>";
        	}
        	if ($videoError[1] === true) {
       			echo "<p>The video file size limit is ".ini_get('upload_max_filesize')."B</p>";
        	}
        	if ($imgError[0] === true) {
        		echo "<p>The image format supported are gif, png, jpg, svg & jpeg</p>";
        	}
        	if ($imgError[1] === true) {
        		echo "<p>The image file size limit is ".ini_get('upload_max_filesize')."B</p>";
        	}
        	if ($subtitleError === true) {
        		echo "<p>The subtitle format supported are txt & json</p>";
        	}
        	echo "</div>";
    	}
?>
</body>
</html>