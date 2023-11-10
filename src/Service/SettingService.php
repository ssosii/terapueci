<?php


namespace App\Service;

use App\Entity\Setting;

use Doctrine\ORM\EntityManagerInterface;
use Twig\Environment;

class SettingService
{
    protected $template;
    protected $em;
    protected $mailer;

    public function __construct(
        EntityManagerInterface $em
    ) {
        $this->em = $em;
    }

    public function getContact()
    {
        return [
            'phone' => $this->em->getRepository(Setting::class)->findOneBy(['name' => 'phone'])->getValue(),
            'email' => $this->em->getRepository(Setting::class)->findOneBy(['name' => 'email'])->getValue()
        ];
    }
    public function getSocial()
    {
        return [
            'facebook' =>  $this->em->getRepository(Setting::class)->findOneBy(['name' => 'facebook'])->getValue(),
            'twitter' => $this->em->getRepository(Setting::class)->findOneBy(['name' => 'twitter'])->getValue()
        ];
    }
}
