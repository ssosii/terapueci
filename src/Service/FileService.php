<?php


namespace App\Service;

use App\Entity\TemponaryFile;

use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\File;

class FileService
{

    private $targetPublicDirectory;
    private $fullDirectory;
    private $extension;

    public function __construct($targetPublicDirectory)
    {
        $this->targetPublicDirectory = $targetPublicDirectory;
    }
    public function createLocationIfNotExist($location)
    {
        if (!file_exists($this->targetPublicDirectory . $location)) {
            mkdir($this->targetPublicDirectory . $location, 0755, true);
        }
    }


    public function uploadOryginalName(?string $filePath, ?string $folder, $fileName): string
    {
        $file = new File($filePath);

        $this->setFullDirectory($folder);
        $this->setExtension($file->guessExtension());
        $this->setSize(filesize($file));


        try {
            $file->move($this->getFullDirectory(), $fileName);
            $this->resizePhoto($this->getFullDirectory() . $fileName, 600);
        } catch (FileException $e) {
            dd($e);
        }
        return $fileName;
    }

    public function upload(?string $filePath, ?string $folder, $id): string
    {
        $file = new File($filePath);
        $fileName = $id . '.' . $file->guessExtension();

        $this->setFullDirectory($folder);
        $this->setExtension($file->guessExtension());
        $this->setSize(filesize($file));

        try {
            $file->move($this->getFullDirectory(), $fileName);
            // $this->resizePhoto($this->getFullDirectory() . $fileName, 600);
        } catch (FileException $e) {
        }
        return $fileName;
    }

    public function getExtensionFromFileObject(?string $filePath): string
    {
        $file = new File($filePath);
        return $file->guessExtension();
    }


    public function getImageExtension($path)
    {
        $explodedPath = explode('.', $path);
        if ($explodedPath) {
            return end($explodedPath);
        }
        return null;
    }

    public function getFileSize($file)
    {
        $fileSize = filesize($file);
        $fileSize = round($fileSize / 1024 / 1024, 1);
        return $fileSize;
    }

    public function isValidFileSize($file, $size)
    {
        $fileSize = $this->getFileSize($file);
        if ($fileSize > $size) {
            return false;
        }
        return true;
    }




    public function moveFile(string $startPath, string $destinationPath)
    {

        $startPath = $this->targetPublicDirectory . $startPath;
        $destinationPath = $this->targetPublicDirectory . $destinationPath;

        if (copy($startPath, $destinationPath)) {

            $this->removeFile($startPath);
            return true;
        }
        return false;
    }

    public function copyFile(string $startPath, string $destinationPath)
    {

        $startPath = $this->targetPublicDirectory . $startPath;
        $destinationPath = $this->targetPublicDirectory . $destinationPath;

        if (copy($startPath, $destinationPath)) {
            // return true;
        }
        // return false;
    }

    public function uploadFileFromUrl(string $filePath, string $url)
    {
        if (file_put_contents($this->targetPublicDirectory . $filePath, file_get_contents($url))) {
            // dd($this->targetPublicDirectory . $filePath);
            // $white = new Imagick();
            // $white->newImage($width, $height, "white");
            // $white->compositeimage($image, Imagick::COMPOSITE_OVER, 0, 0);
            // $white->setImageFormat('jpg');
            // $white->writeImage('image.jpg');

            $image = new \Imagick($this->targetPublicDirectory . $filePath);
            $image->setImageFormat('jpg');
            $image->setImageCompressionQuality(100);
            $image->writeImage($this->targetPublicDirectory . $filePath);

            $this->resizePhoto($this->targetPublicDirectory . $filePath, 600);
            return true;
        }
        return false;
    }

    public function resizePhoto($path, $maxWidth, $height = null)
    {
        $extension = $this->getImageExtrension($path);
        list($origWidth, $origHeight) = getimagesize($path);
        $width = $origWidth;
        $height = $origHeight;
        if ($width > $maxWidth) {
            $height = ($maxWidth / $width) * $height;
            $width = $maxWidth;
        }

        $image_p = imagecreatetruecolor($width, $height);

        if ($extension == 'png') {
            $image = imagecreatefrompng($path);
        } else if ($extension == 'jpg' || $extension == 'jpeg') {
            $image = imagecreatefromjpeg($path);
        } else if ($extension == 'gif') {
            $image = imagecreatefromgif($path);
        }


        imagecopyresampled(
            $image_p,
            $image,
            0,
            0,
            0,
            0,
            $width,
            $height,
            $origWidth,
            $origHeight
        );
        if ($extension == 'png') {
            imagejpeg($image_p, $path);
        } elseif ($extension == 'jpg' || $extension == 'jpeg') {
            imagepng($image_p, $path);
        } else if ($extension == 'gif') {
            imagegif($image_p, $path);
        }

        return $image_p;
    }
    public function getImageExtrension($path)
    {
        $explodedPath = explode('.', $path);
        if ($explodedPath) {
            return end($explodedPath);
        }
        return null;
    }

    public function setExtension(?string $extension): string
    {
        return $this->extension = $extension;
    }

    public function getExtension(): string
    {
        return $this->extension;
    }

    public function setSize(?string $size): string
    {
        return $this->size = $size;
    }
    public function getSize(): string
    {
        return $this->size;
    }


    public function setFullDirectory(?string $folder): string
    {
        return $this->fullDirectory = $this->targetPublicDirectory . $folder;
    }

    public function getFullDirectory(): string
    {
        return $this->fullDirectory;
    }

    public function removeFile(?string $filePath, $isFullDirectory = false)
    {
        $filePath = $isFullDirectory ? $this->targetPublicDirectory . $filePath : $filePath;
        //  dd('xxx',$filePath);
         if (file_exists($filePath)) {
        //  dd('mm',$filePath);
        @unlink($filePath);
           }
    }

    public function moveFileFromTemponaryImageToUploadDirectory($temponaryImage, $entity, $location, $oryginalFileName)
    {

        $extension = $temponaryImage->getExtension();
        $this->createLocationIfNotExist($location);
        $temponaryImagePath = TemponaryFile::FILES_LOCATION . $temponaryImage->getId() . '.' . $extension;
        $destinationPath = $location . '/' . $oryginalFileName;
        $this->moveFile($temponaryImagePath, $destinationPath);
        return $entity;
    }

    public function adaptationFileName($string)
    {

        function replaceAccents($str)
        {
            $a = array('À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'ß', 'à', 'á', 'â', 'ã', 'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', 'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'ÿ', 'Ā', 'ā', 'Ă', 'ă', 'Ą', 'ą', 'Ć', 'ć', 'Ĉ', 'ĉ', 'Ċ', 'ċ', 'Č', 'č', 'Ď', 'ď', 'Đ', 'đ', 'Ē', 'ē', 'Ĕ', 'ĕ', 'Ė', 'ė', 'Ę', 'ę', 'Ě', 'ě', 'Ĝ', 'ĝ', 'Ğ', 'ğ', 'Ġ', 'ġ', 'Ģ', 'ģ', 'Ĥ', 'ĥ', 'Ħ', 'ħ', 'Ĩ', 'ĩ', 'Ī', 'ī', 'Ĭ', 'ĭ', 'Į', 'į', 'İ', 'ı', 'Ĳ', 'ĳ', 'Ĵ', 'ĵ', 'Ķ', 'ķ', 'Ĺ', 'ĺ', 'Ļ', 'ļ', 'Ľ', 'ľ', 'Ŀ', 'ŀ', 'Ł', 'ł', 'Ń', 'ń', 'Ņ', 'ņ', 'Ň', 'ň', 'ŉ', 'Ō', 'ō', 'Ŏ', 'ŏ', 'Ő', 'ő', 'Œ', 'œ', 'Ŕ', 'ŕ', 'Ŗ', 'ŗ', 'Ř', 'ř', 'Ś', 'ś', 'Ŝ', 'ŝ', 'Ş', 'ş', 'Š', 'š', 'Ţ', 'ţ', 'Ť', 'ť', 'Ŧ', 'ŧ', 'Ũ', 'ũ', 'Ū', 'ū', 'Ŭ', 'ŭ', 'Ů', 'ů', 'Ű', 'ű', 'Ų', 'ų', 'Ŵ', 'ŵ', 'Ŷ', 'ŷ', 'Ÿ', 'Ź', 'ź', 'Ż', 'ż', 'Ž', 'ž', 'ſ', 'ƒ', 'Ơ', 'ơ', 'Ư', 'ư', 'Ǎ', 'ǎ', 'Ǐ', 'ǐ', 'Ǒ', 'ǒ', 'Ǔ', 'ǔ', 'Ǖ', 'ǖ', 'Ǘ', 'ǘ', 'Ǚ', 'ǚ', 'Ǜ', 'ǜ', 'Ǻ', 'ǻ', 'Ǽ', 'ǽ', 'Ǿ', 'ǿ');
            $b = array('A', 'A', 'A', 'A', 'A', 'A', 'AE', 'C', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'D', 'N', 'O', 'O', 'O', 'O', 'O', 'O', 'U', 'U', 'U', 'U', 'Y', 's', 'a', 'a', 'a', 'a', 'a', 'a', 'ae', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'n', 'o', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'y', 'y', 'A', 'a', 'A', 'a', 'A', 'a', 'C', 'c', 'C', 'c', 'C', 'c', 'C', 'c', 'D', 'd', 'D', 'd', 'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 'G', 'g', 'G', 'g', 'G', 'g', 'G', 'g', 'H', 'h', 'H', 'h', 'I', 'i', 'I', 'i', 'I', 'i', 'I', 'i', 'I', 'i', 'IJ', 'ij', 'J', 'j', 'K', 'k', 'L', 'l', 'L', 'l', 'L', 'l', 'L', 'l', 'l', 'l', 'N', 'n', 'N', 'n', 'N', 'n', 'n', 'O', 'o', 'O', 'o', 'O', 'o', 'OE', 'oe', 'R', 'r', 'R', 'r', 'R', 'r', 'S', 's', 'S', 's', 'S', 's', 'S', 's', 'T', 't', 'T', 't', 'T', 't', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'W', 'w', 'Y', 'y', 'Y', 'Z', 'z', 'Z', 'z', 'Z', 'z', 's', 'f', 'O', 'o', 'U', 'u', 'A', 'a', 'I', 'i', 'O', 'o', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'A', 'a', 'AE', 'ae', 'O', 'o');
            return str_replace($a, $b, $str);
        }
        $string = replaceAccents($string);
        $string = str_replace(' ', '_', $string);
        return $string;
    }

    public function generateUniqueFileName()
    {
        return md5(uniqid());
    }
    public function getCurrentPrefix()
    {
        $now = new \DateTime('now');
        return $now->format('Y-W');
    }

    public function getFileExtensionFromUrlAndReturnIfImage($path)
    {
        if (isset(pathinfo($path)['extension'])) {
            $extension = pathinfo($path)['extension'];
            if ($this->checkIsImage($extension)) {
                return $extension;
            }
        }
        return false;
    }
    public function getFileExtension($path)
    {
        return pathinfo($path)['extension'];
    }

    public function checkIsImage($extension)
    {
        if ($extension == 'jpg' || $extension == 'png' || $extension == 'jpeg') {
            return true;
        }
        return false;
    }
    public function checkFileExist($url)
    {
        $file_headers = @get_headers($url);

        if (stripos($file_headers[0], "200 OK")) {
            return true;
        } else {
            return false;
        }
    }
}