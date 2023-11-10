<?php


namespace App\Service;

use App\Entity\MasterCategory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;

class DoctorService
{


    public function __construct(Security $security, EntityManagerInterface $em)
    {
        $this->security = $security;
        $this->em = $em;
    }
    public function isDoctor($user)
    {
        $arrayRoles = $user->getRoles();
        if (in_array("ROLE_DOCTOR", $arrayRoles)) {
            return true;
        }
        return false;
    }
    public function getDoctor()
    {
        return $this->security->getUser();
    }

    public function getDisplayNameForMasterCategory($id){
      return  $this->em->getRepository(MasterCategory::class)->findOneBy(['id'=>$id]);
    }
}
