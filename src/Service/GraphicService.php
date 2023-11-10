<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\RouterInterface;

use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\RequestContext;


class GraphicService
{
    private $targetPublicDirectory;

    public function __construct($targetPublicDirectory, $images, $fonts, SessionInterface $session, EntityManagerInterface $em)
    {
        $this->targetPublicDirectory = $targetPublicDirectory;
        $this->postUrl = $targetPublicDirectory . '/upload/post/';
        $this->uploadUrl = $targetPublicDirectory . '/upload/';
        $this->temponaryImageUrl = $targetPublicDirectory . '/upload/temponary-image/';
        $this->images = $images;
        $this->fonts = $fonts;
        $this->em = $em;
    }

    public function getBackgroundColorType($backgroundColor)
    {
        if ($backgroundColor == "#ffffff") {
            return 'white';
        } else if ($backgroundColor == "#272e38") {
            return 'blue';
        } else {
            return 'black';
        }
    }

    public function getFontForTitle()
    {
        // return $this->fonts . '/OpenSans-Bold.ttf';
        // return $this->fonts . '/Chivo-Bold.ttf';
        // return $this->fonts . '/Signika-Bold.ttf';
        return $this->fonts . '/Roboto-Bold.ttf';
    }

    public function getFontForDescription()
    {
        // return $this->fonts . '/OpenSans-Bold.ttf';
        // return $this->fonts . '/Chivo-Regular.ttf';
        // return $this->fonts . '/Signika-Regular.ttf';
        return $this->fonts . '/Roboto-Regular.ttf';
    }
    public function getFontBreakingNews()
    {
        return $this->fonts . '/Signika-SemiBold.ttf';
    }
    public function getImageSizeForTemponaryImage($image)
    {
        $image = $this->temponaryImageUrl . $image;
        return $this->getImageSize($image);
    }

    public function getImageSize($filePath)
    {
        list($width, $height) = getimagesize($filePath);
        return ['height' => $height, 'width' => $width];
    }



    private function getWatermarkForBlack()
    {
        // return $this->images . '/watermark_black.png';
        return $this->images . '/watermark_gold.png';
    }
    private function getWatermarkForBlue()
    {
        return $this->images . '/watermark_gold.png';
    }
    private function getWatermarkForWhite()
    {
        // return $this->images . '/watermark_white.png';
        return $this->images . '/watermark_white.png';
    }



    public function getExtension($filePath)
    {
        $path_parts = pathinfo($filePath);
        return $path_parts['extension'];
    }

    public function getImageParams($image)
    {
        $imageSize = $image->getImageGeometry();
        return ['width' => $imageSize['width'], 'height' => $imageSize['height']];
    }



    public function checkHeightText($string, $font_size, $font_type, $line_width, $interline_spacing, $extra_height = 0)
    {
        $image = new \Imagick();
        $draw = new \ImagickDraw();
        $draw->setgravity(\Imagick::GRAVITY_CENTER);
        $draw->setTextEncoding('UTF-8');
        $draw->setFontSize($font_size);
        $draw->setFillColor('white');
        $draw->setFont($font_type);
        $draw->setTextInterlineSpacing($interline_spacing);
        // $draw->setTextKerning(-1);

        $array_lines_title = $this->wordWrapAnnotation($image, $draw, $string, $line_width);

        $counted_lines = count($array_lines_title['0']);
        $metrics = $image->queryFontMetrics($draw, $string);
        $total_height_title = ($metrics['textHeight'] + $extra_height) * $counted_lines;

        return $total_height_title;
    }

    public function createFrame($totalWidth, $totalHeight, $backgroundColor)
    {
        $frame = new \Imagick();
        // $frame->newImage($totalWidth, $totalHeight, new \ImagickPixel('#272e38'));
        $frame->newImage($totalWidth, $totalHeight, new \ImagickPixel($backgroundColor));
        return $frame;
    }

    public function prepareDraw($fontSize, $color, $fontType, $interlineSpacing)
    {

        $draw = new \ImagickDraw();
        $draw->setgravity(\Imagick::GRAVITY_CENTER);
        $draw->setTextEncoding('UTF-8');
        $draw->setFontSize($fontSize);
        $draw->setFillColor($color);
        $draw->setFont($fontType);
        $draw->setTextInterlineSpacing($interlineSpacing);
        // $draw->setTextKerning(-1);
        return $draw;
    }

    public function drawText($frame, $draw, $text, $textWidthPadding, $xpos, $ypos)
    {

        list($lines, $lineHeight) = $this->wordWrapAnnotation($frame, $draw, $text, $textWidthPadding);

        for ($i = 0; $i < count($lines); $i++) {

            $frame->annotateImage($draw, $xpos, $ypos + $i * $lineHeight, 0, $lines[$i]);
        }
        return $frame;
    }

    public function addWatermark($frame, $image, $topMargin, $leftMargin, $border, $backgroundColor)
    {
        $imageParams = $this->getImageParams($image);
        $backgroundType = $this->getBackgroundColorType($backgroundColor);
        if ($backgroundType == "white") {
            $watermark = new \Imagick($this->getWatermarkForWhite());
        } else if ($backgroundType == "blue") {
            $watermark = new \Imagick($this->getWatermarkForBlue());
        } else {
            $watermark = new \Imagick($this->getWatermarkForBlack());
        }

        $watermarkPosition = $topMargin + $imageParams['height'] - 28;
        $frame->compositeImage($watermark, $image->getImageCompose(), (($leftMargin + $border + $imageParams['width'] / 2) - 69), $watermarkPosition);
    }

    public function saveFrame($frame, $filePath)
    {

        $frame->setImageFormat('jpg');
        $frame->writeImage($filePath);
        $frame->setCompressionQuality(100);
        $frame->destroy();
        $frame->clear();
    }

    public function createBreakingNews($filePath, $titleString, $describeString)
    {
        $params = [
            'filePath' => $this->targetPublicDirectory . '/' . $filePath,
            'titleString' => trim(mb_strtoupper($titleString, "UTF-8")),
            'describeString' => trim(mb_strtoupper($describeString, "UTF-8")),
            'extension' => $this->getExtension($filePath),
        ];

        $image = new \Imagick($params['filePath']);
        $image->cropThumbnailImage(725, 425);
        $image->setImagePage(0, 0, 0, 0);

        //Title

        $rectagle = new \ImagickDraw();
        $rectagle->setFillColor('#e0e0e4');
        $rectagle->rectangle(52, 315, 724, 369);
        $rectagle->setFillAlpha(0.4);
        @$rectagle->setFillAlpha(0.4);
        $rectagle->setFillOpacity(0.4);
        $image->drawImage($rectagle);


        $titleDraw = new \ImagickDraw();
        $titleDraw->setFillColor('black');
        $titleDraw->setFont($this->getFontBreakingNews());
        $titleDraw->setFontSize(27);
        $titleDraw->setTextUnderColor('#d9dee1');

        $image->annotateImage($titleDraw, 63, 350, 0, $params['titleString']);

        //DESCRIPTION

        //yellow

        $rectagle = new \ImagickDraw();
        $rectagle->setFillColor('#fde93a');
        $rectagle->rectangle(52, 370, 724, 405);
        $rectagle->setFillOpacity(0.3);

        $image->drawImage($rectagle);

        //time
        $rectagle = new \ImagickDraw();
        $rectagle->setFillColor('black');
        $rectagle->rectangle(52, 370, 110, 405);
        $rectagle->setFillOpacity(0.3);

        $image->drawImage($rectagle);

        $descriptionDraw = new \ImagickDraw();
        $descriptionDraw->setFillColor('white');
        $descriptionDraw->setFont($this->getFontBreakingNews());
        $descriptionDraw->setFontSize(18);
        $now = new \DateTime('now');
        $time = $now->format('H:i');

        $image->annotateImage($descriptionDraw, 59, 395, 0, $time);



        //description
        $descriptionDraw = new \ImagickDraw();
        $descriptionDraw->setFillColor('black');
        $descriptionDraw->setFont($this->getFontBreakingNews());
        $descriptionDraw->setFontSize(18);

        $image->annotateImage($descriptionDraw, 117, 395, 0, $params['describeString']);


        // //breaking news
        // $breakingNews = new \Imagick($this->images . "/breaking_news.png");
        // $image->compositeImage($breakingNews, $breakingNews->getImageCompose(), 52, 278);

        //live
        $live = new \Imagick($this->images . "/live.png");
        $image->compositeImage($live, $live->getImageCompose(), 20, 20);

        //logo
        $logo = new \Imagick($this->images . "/watermark_news.png");
        $image->compositeImage($logo, $logo->getImageCompose(), 540, 20);

        $this->saveFrame($image, $params['filePath']);






    }
    public function prepareDescriptionColor($backgroundColor)
    {
        return $backgroundColor == '#ffffff' ? 'black' : 'white';
    }
    public function createGraphic($gcsPrefix, $fileName, $fileNameToSave, $filePath, $backgroundColor, $titleString, $describeString, $titleColor, $descriptionColor, $isYoutube = true, $titleTopString = null)
    {


        $config = [
            'border' => 0,
            'topMargin' => 7,
            'leftMargin' => 0,
            'gapLine' => 28,
            'gapLineImage' => 14,
            'fontTypeTitle' => $this->getFontForTitle(),
            'fontTypeDescription' => $this->getFontForDescription(),
            'titleFontSize' => 30,
            'describeFontSize' => 19,
            'textWidthPadding' => 25,
            'titleColor' => $titleColor,
            'describeColor' => $descriptionColor,
            'extraTitleTopHeight' => 0,
            'extraDescriptionHeight' => 0,
            'interlineSpacingTitle' => 13,
            'interlineSpacingDescription' => 38,
            // 'watermarkExtraHeight' => $isYoutube ? -5 : 0
            'watermarkExtraHeight' => 0
        ];

        $params = [
            'filePath' => $this->targetPublicDirectory . '/' . $filePath,
            'titleString' => trim($titleString),
            'describeString' => trim($describeString),
            'titleTopString' => trim($titleTopString),
            'extension' => $this->getExtension($filePath),
            'backgroundColor' => $backgroundColor,
        ];


        $image = new \Imagick($params['filePath']);
        $imageParams = $this->getImageParams($image);

        $textWidthPadding = $imageParams['width'] - $config['textWidthPadding'];

        $titleHeight = !empty($params['titleString']) ? $this->checkHeightText($params['titleString'], $config['titleFontSize'], $config['fontTypeTitle'], $textWidthPadding, $config['interlineSpacingTitle']) + $config['gapLine'] : 0;

        $titleTopHeight = !empty($params['titleTopString'])
            ? $this->checkHeightText($params['titleTopString'], $config['titleFontSize'], $config['fontTypeTitle'], $textWidthPadding, $config['interlineSpacingTitle']) + $config['gapLine']
            : 0;

        $describeHeight = !empty($params['describeString'])
            ? $this->checkHeightText($params['describeString'], $config['describeFontSize'], $config['fontTypeDescription'], $textWidthPadding, $config['interlineSpacingDescription']) + $config['gapLine']
            : 0;


        $extraHeight = 0;
        //titleTop
        if (!empty($params['titleTopString']) && empty($params['titleString']) && empty($params['describeString'])) {
            $extraHeight = -9;
        }
        //titleTop description
        if (!empty($params['titleTopString']) && empty($params['titleString']) && !empty($params['describeString'])) {
            $extraHeight = -8;
        }
        //titleTop title
        if (!empty($params['titleTopString']) && !empty($params['titleString']) && empty($params['describeString'])) {
            $extraHeight = -15;
        }
        // title description
        if (empty($params['titleTopString']) && !empty($params['describeString']) && !empty($params['titleString'])) {
            $extraHeight = -15;
        }
        // titleTop title description
        if (!empty($params['titleTopString']) && !empty($params['describeString']) && !empty($params['titleString'])) {
            $extraHeight = -17;
        }

        //title
        if (empty($params['titleTopString']) && empty($params['describeString']) && !empty($params['titleString'])) {
            $extraHeight = -3;
        }

        // dd($extraHeight);

        $totalHeight = $extraHeight + $imageParams['height'] + $describeHeight + $titleHeight + $titleTopHeight;
        $totalWidth = $imageParams['width'];


        $frame = $this->createFrame($totalWidth, $totalHeight, $params['backgroundColor']);

        // dd($imageParams['height'] , $config['topMargin'] , $describeHeight , $titleHeight , $titleTopHeight,$totalHeight);
        // TITLE TOP
        if ($params['titleTopString']) {
            $xposTitleTop = 0;
            $yposTitleTop = $config['gapLine'] - $totalHeight / 2;

            $titleTopDraw = $this->prepareDraw($config['titleFontSize'], $config['titleColor'], $config['fontTypeTitle'], $config['interlineSpacingTitle']);
            $frame = $this->drawText($frame, $titleTopDraw, $titleTopString, $textWidthPadding, $xposTitleTop, $yposTitleTop);
        }

        if ($params['titleString']) {
            // TITLE
            $xposTitle = 0;
            // $yposTitle = ($imageParams['height'] + (2 * $config['gapLine']) + $titleTopHeight) - $totalHeight / 2;

            $yposTitle = ($config['watermarkExtraHeight'] + $imageParams['height'] + $titleTopHeight + $config['gapLine'] - (!empty($params['titleTopString']) ? $config['topMargin'] : 0)) - $totalHeight / 2;

            $titleDraw = $this->prepareDraw($config['titleFontSize'], $config['titleColor'], $config['fontTypeTitle'], $config['interlineSpacingTitle']);

            $frame = $this->drawText($frame, $titleDraw, $titleString, $textWidthPadding, $xposTitle, $yposTitle);
        }
        //  DESCRIPTION
        if ($params['describeString']) {
            $xposDescribe = 0;
            $extraHeight = 0;
            //titleTopString
            if (!empty($params['titleTopString']) && empty($params['titleString']) && empty($params['describeString'])) {
                $extraHeight = -19;
            }
            //description
            if (!empty($params['titleTopString'] && !empty($params['titleString']) && empty($params['describeString']))) {

                $extraHeight = 10;
            }
            //titleString
            if (!empty($params['titleTopString']) && empty($params['titleString']) && !empty($params['describeString'])) {
                $extraHeight = -16;
            }
            //titleString titleTopString description
            if (!empty($params['titleTopString']) && !empty($params['titleString']) && !empty($params['describeString'])) {

                $extraHeight = 0;
            }
            //titleString description
            if (empty($params['titleTopString']) && !empty($params['titleString']) && !empty($params['describeString'])) {
                $extraHeight = -2;
            }

            $yposDescribe = ($config['watermarkExtraHeight'] + $imageParams['height'] + $titleHeight + $titleTopHeight - $extraHeight) - $totalHeight / 2;
            $describeDraw = $this->prepareDraw($config['describeFontSize'], $config['describeColor'], $config['fontTypeDescription'], $config['interlineSpacingDescription']);
            $frame = $this->drawText($frame, $describeDraw, $describeString, $textWidthPadding, $xposDescribe, $yposDescribe);
        }

        $topMarginForImage = 0;
        if ($titleTopHeight) {
            $topMarginForImage = $titleTopHeight - $config['topMargin'] - 2;
        }
        $frame->compositeImage($image, $image->getImageCompose(), $config['leftMargin'], $topMarginForImage);
        if (!$isYoutube) {
            $this->addWatermark($frame, $image, $topMarginForImage, $config['leftMargin'], $config['border'], $params['backgroundColor']);
        }

        // $this->saveFrame($frame, $params['filePath']);

        $this->saveFrame($frame, $fileNameToSave);


      
    
    

        // Close the file handle


        return $titleTopHeight;
    }


    public function wordWrapAnnotation(&$image, &$draw, $text, $maxWidth)
    {
        $words = explode(" ", $text);
        $lines = array();
        $i = 0;
        $lineHeight = 25;
        while ($i < count($words)) {
            $currentLine = $words[$i];
            if ($i + 1 >= count($words)) {
                $lines[] = $currentLine;
                break;
            }
            //Check to see if we can add another word to this line
            $metrics = $image->queryFontMetrics($draw, $currentLine . ' ' . $words[$i + 1]);
            while ($metrics['textWidth'] <= $maxWidth) {
                //If so, do it and keep doing it!
                $currentLine .= ' ' . $words[++$i];
                if ($i + 1 >= count($words))
                    break;
                $metrics = $image->queryFontMetrics($draw, $currentLine . ' ' . $words[$i + 1]);
            }
            //We can't add the next word to this line, so loop to the next line
            $lines[] = $currentLine;
            $i++;
            //Finally, update line height

            if ($metrics['textHeight'] > $lineHeight)
                $lineHeight = $metrics['textHeight'];
        }
        return array($lines, $lineHeight);
    }

// public function checkHeight($string, $font_size, $font_type, $line_width, $extra_height = 0)
// {
//     $image = new \Imagick();
//     $draw = new \ImagickDraw();
//     $draw->setgravity(\Imagick::GRAVITY_CENTER);
//     $draw->setTextEncoding('UTF-8');
//     $draw->setFontSize($font_size);
//     $draw->setFillColor('white');
//     $draw->setFont($font_type);
//     $array_lines_title = $this->wordWrapAnnotation($image, $draw, $string, $line_width);
//     $counted_lines = count($array_lines_title['0']);
//     $metrics = $image->queryFontMetrics($draw, $string);
//     $total_height_title = ($metrics['textHeight'] + $extra_height) * $counted_lines;

//     return $total_height_title;
// }
}