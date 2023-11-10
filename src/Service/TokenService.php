<?php


namespace App\Service;


use App\Entity\User;
use Doctrine\ORM\Mapping\Entity;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;


class TokenService
{

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function generateTokenForChangeMail()
    {
        $chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $code = "";
        for ($i = 0; $i < 20; $i++) {
            $code .= $chars[mt_rand(0, strlen($chars) - 1)];
        }

        $user = $this->em->getRepository(User::class)->findOneBy(['tokenChangeEmail' => $code]);

        if ($user) {
            $this->generateTokenForChangeMail();
        } else {
            return $code;
        }
    }

    public function generateTokenForForgotPassword()
    {
        $chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $code = "";
        for ($i = 0; $i < 20; $i++) {
            $code .= $chars[mt_rand(0, strlen($chars) - 1)];
        }

        $user = $this->em->getRepository(User::class)->findOneBy(['tokenChangePassword' => $code]);

        if ($user) {
            $this->generateTokenForForgotPassword();
        } else {
            return $code;
        }
    }

    public function generateTokenForRegisterEmail()
    {
        $code = $this->createToken();
        $user = $this->em->getRepository(User::class)->findOneBy(['tokenRegisterEmail' => $code]);

        if ($user) {
            $this->generateTokenForRegisterEmail();
        }
        return $code;
    }

    private function createToken()
    {
        $chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $code = "";
        for ($i = 0; $i < 20; $i++) {
            $code .= $chars[mt_rand(0, strlen($chars) - 1)];
        }
        return $code;
    }


}
