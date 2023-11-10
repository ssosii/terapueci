<?php


namespace App\Service;

use App\Helper\AdvertisementHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

use App\Service\UserService;

class BaseService
{
    public function __construct(
        EntityManagerInterface $em,
        SessionInterface $session,
        UrlGeneratorInterface $router,
        UserService $userService
    ) {
        $this->em = $em;
        $this->session = $session;
        $this->userService = $userService;
        $this->router = $router;
    }
    public function saveEntityInDB($entity)
    {
        $this->em->persist($entity);
        $this->em->flush();
    }
    public function removeEntityFromDB($entity)
    {
        $this->em->remove($entity);
        $this->em->flush();
    }
}
