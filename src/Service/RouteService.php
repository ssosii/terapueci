<?php


namespace App\Service;

use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class RouteService
{

    public function isSinglePost($url)
    {
        if (strpos($url, 'post-')) {
            return true;
        }

        return false;
    }

    public function prepareBodyClassesFromRoute($route)
    {
        $array = explode("_", $route);
        if (count($array) > 1) {
            return $array[1];
        }
        return "";
    }

    public function getProjectDir(): string
    {
        return \dirname(__DIR__);
    }

    public function getDomainUrl()
    {
        return 'http://' . $_SERVER['HTTP_HOST'];
    }
}
