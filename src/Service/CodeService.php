<?php

namespace App\Service;


use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Doctrine\ORM\EntityManagerInterface;


class CodeService
{

    private $em;
    private $session;

    public function __construct(EntityManagerInterface $em, SessionInterface $session)
    {
        $this->em = $em;
        $this->session = $session;
    }

    public function generateUnicode()
    {
        $now = new \DateTime('now');
        $now = $now->format('Y-m-d H:i:s') . rand(5, 500);
        return md5(uniqid($now, true)) . rand(5, 10000);
    }

    public function getPriceAfterUsePromoCode($promoCode, $price)
    {

    }

}
