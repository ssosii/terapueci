<?php

namespace App\Controller;


use App\Entity\User;
use App\Entity\DoctorCategory;
use App\Service\FileService;
use App\Service\EmailService;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\UserService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class UserController extends BaseSiteController
{


    /**
     * @Route("/profil-{user}/{slug}", name="user_profile")
     */
    public function index(User $user, $slug, UserService $userService): Response
    {

        $loggedUser = $userService->getUser();
        // dd( $userService->isOwner($loggedUser, $user->getId()));
        // dd($user);
        $viewParameters = [

        ];

        return $this->render('frontend/admin/doctor/single.html.twig', $viewParameters);
    }

    //  /**
    //  * @Route("/admin/specjalista/dodaj", name="admin_doctor-create")
    //  */
    // public function create(Request $request, EmailService $emailService, FileService $fileHelper, UserPasswordEncoderInterface $passwordEncoder)
    // {


     
        
    //     function randomPassword()
    //     {
    //         $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    //         $pass = array(); //remember to declare $pass as an array
    //         $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
    //         for ($i = 0; $i < 8; $i++) {
    //             $n = rand(0, $alphaLength);
    //             $pass[] = $alphabet[$n];
    //         }
    //         return implode($pass); //turn the array into a string
    //     }

    //     $error = "";

    //     if ($request->isMethod('post')) {
    //         $file = $request->files->get('avatar');
    //         $username = $request->request->get('username');
    //         $email = $request->request->get('email');
    //         $phone = $request->request->get('phone');
    //         $price = $request->request->get('price');
    //         $price  = str_replace(",",".",trim($price));
    //         $description = $request->request->get('description');
    //         $password = $request->request->get('password');
    //         $categories = $request->request->get('categories');
    //         $specialisation = $request->request->get('specialisation');
    //         $categoryEntities = $this->em->getRepository(DoctorCategory::class)->findFromArray($categories);
    //         $userExist = $this->em->getRepository(User::class)->findOneBy(['email' => $email]);

    //         if ($email && !$userExist) {


    //             $user = new User();
    //             $user->setUsername($username);
    //             $user->setIsActive(true);
    //             $user->setPhone($phone);
    //             $user->setPrice($price);
    //             $user->setEmail($email);
    //             $user->setRoles(['ROLE_DOCTOR']);
    //             $user->setDescription($description);
    //             $user->setSpecialisation($specialisation);
    //             $encoded = $passwordEncoder->encodePassword($user, $password);
    //             $user->setPassword($encoded);



    //             $user->getDoctorCategories()->clear();
    //             foreach ($categoryEntities as $c) {
    //                 $user->addDoctorCategory($c);
    //             }


    //             $this->em->persist($user);
    //             $this->em->flush();

    //             if ($file) {
    //                 $fileHelper->upload($file, User::FILES_AVATAR_LOCATION, $user->getId());
    //                 $user->setAvatar($user->getId() . '.' . $fileHelper->getExtension());
    //                 $this->em->persist($user);
    //                 $this->em->flush();
    //             }
    //             $data = [
    //                 'date' => $username,
    //                 'email' =>  $email,
    //                 'password' => $password,

    //             ];


    //             $emailService->sendConfiguratorUserCreated($user, $data);

    //             $this->addFlash('success', 'Dane zostały zapisane poprawnie');
    //             return $this->redirect($this->generateUrl('admin_doctor'));
    //         } else {
    //             $error = "Wybrany email jest niepoprawny lub istnieje już w bazie danych";
    //         }
    //     }


    //     $viewsParams = [
    //         'randomPassword' => randomPassword(),
    //         'categories' => $this->em->getRepository(DoctorCategory::class)->findBy(['isActive' => true]),
    //         'error' => $error
    //     ];

    //     return $this->render('admin/views/doctor/create.html.twig', $viewsParams);
    // }




}
