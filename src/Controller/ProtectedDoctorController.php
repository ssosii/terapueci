<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Service\UserService;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class ProtectedDoctorController  extends BaseSiteController
{

    /**
     * @Route("/panel-specjalisty", name="panel-specialist")
     */
    public function myProfile(
        Request $request,
        EntityManagerInterface $em,
        UserService $userService
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

        return $this->render('frontend/views/panel-specialist/index.html.twig', []);
    }


}