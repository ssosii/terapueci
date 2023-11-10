<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Entity\DoctorCategory;
use App\Entity\AppointmentRule;
use App\Helper\DoctorHelper;
use App\Helper\EmailHelper;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PatientController extends BaseSiteController
{
    /**
     * @Route("/panel-pacjenta", name="panel-patient")
     */
    public function patientPanel(
        Request $request,
        EntityManagerInterface $em
        // UserService $userService
    ) {

        $user = $this->getUser();
        // dd($user);

        if (!$user) {
            // $this->router->generate('app_login-page', [
            // ]);
            return $this->redirectToRoute('app_login-page');
        }
        // if (!$user && !$userService->isDoctor($user)) {
        //     $this->router->generate('app_login-page', [
        //     ]);
        // }

        return $this->render('frontend/views/panel-patient/index.html.twig', []);
    }
    /**
     * @Route("/{slug}/d-{doctor}", name="profile-doctor")
     */
    public function patientProfile(
        $slug,
        User $doctor,
        Request $request,
        EntityManagerInterface $em
        // UserService $userService
    ) {

        $user = $this->getUser();

    
        return $this->render('frontend/views/patient/profile.html.twig', ['patient' => $doctor]);
    }

}