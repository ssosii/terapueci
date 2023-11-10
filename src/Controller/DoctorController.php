<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Entity\DoctorCategory;
use App\Entity\AppointmentRule;
use App\Service\DoctorService;
use App\Service\EmailService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class DoctorController extends BaseSiteController
{
   
    /**
     * @Route("/znajdz-specjaliste", name="doctor_list")
     */
    public function list(EntityManagerInterface $em, DoctorService $doctorService, EmailService $emailService)
    {

        $doctors = $em->getRepository(User::class)->fetchByRoleActive('ROLE_DOCTOR');

        $categories = $em->getRepository(DoctorCategory::class)->findBy(['isActive' => true]);

        return $this->render('frontend/views/appointment/doctor-list.html.twig', [
            'doctors' => $doctors,
            'categories' => $categories,
            'label' => "Nasi specjaliści"
        ]);
    }
  
}