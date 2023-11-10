<?php

namespace App\Service;


use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Doctrine\ORM\EntityManagerInterface;


class PaymentService
{

    private $em;
    private $session;
    private $crc;
    private $merchantId;
    private $posId;
    private $raportKey;
    private $apiUrl;
    private $appUrl;

    public function __construct(EntityManagerInterface $em, SessionInterface $session)
    {
        $this->em = $em;
        $this->session = $session;

        //sandbox
        $this->crc = 'e8e8dfe2c59ffd1a';
        $this->merchantId = '247342';
        $this->posId = '247342';
        $this->raportKey = "c75aa301c8ebf872a900314a19475da5";
        $this->apiUrl = "https://sandbox.przelewy24.pl";
        $this->appUrl = "https://terapeuci-test.dkonto.pl";

    }

    public function getParams()
    {
        return [
            "crc" => $this->crc,
            "merchantId" => $this->merchantId,
            "posId" => $this->posId,
            "raportKey" => $this->raportKey,
            "apiUrl" => $this->apiUrl,
            "appUrl" => $this->appUrl
        ];
    }


}