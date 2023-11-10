<?php

namespace App\Controller;

use App\Entity\FakeAccount;
use App\Entity\User;
use App\Entity\Langue;

use App\Service\UserService;
use App\Service\EmailService;

use Symfony\Component\HttpFoundation\Session\Session;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

use App\Form\RegistrationFormType;
// use App\Helper\EmailHelper;
// use App\Helper\TokenHelper;

use Symfony\Component\HttpFoundation\Request;

use App\Security\LoginFormAuthenticator;
use App\Service\TokenService;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;

class SecurityController extends BaseSiteController
{



    /**
     * @Route("/api-check-email-exist", name="user_email-exist")
     */
    public function checkUserEmailExist(Request $request)
    {
        $email = $request->request->get('email');
        $user = $this->em->getRepository(User::class)->findByEmail($email);
        if ($user) {
            return new JsonResponse([
                'status' => 'OK',
                'code' => 200,
            ]);
        }
        return new JsonResponse([
            'status' => "",
            'code' => 400
        ]);
    }


    /**
     * @Route("/api-recover-password", name="user_api-recover-password11")
     */
    public function passwordRecoverMail(Request $request, TokenService $tokenService, EmailService $emailService)
    {
        $email = $request->request->get('email');
        // $email = "maciejfiglarz333@gmail.com";
        $user = $this->em->getRepository(User::class)->findByEmail($email);

        if ($user) {
            $token = $tokenService->generateTokenForForgotPassword();
            $user->setTokenChangePassword($token);
            $date = new \DateTime('+7 day');
            $user->setTokenChangePasswordExpired($date);
            $this->em->persist($user);
            $this->em->flush();

            $emailService->sendRecoverPasswordLink($user);

            return new JsonResponse([
                'status' => 'OK',
                'code' => 200,
                'url' => '/resetuj-haslo/' . $token
            ]);
        }

        return new JsonResponse([
            'status' => "NOT",
            'code' => 400,
            'message' => $email
        ]);
    }


    /**
     * @Route("/admin/active-mail/{id}", name="user_active-email")
     */
    public function activeEmail(User $user, EmailService $emailService, Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        if ($user) {
            $emailService->sendRegisterUser($user);
            return new JsonResponse([
                'status' => 'OK',
                'code' => 200,
            ]);
        }
        return new JsonResponse([
            'status' => "",
            'code' => 400,
            ""
        ]);
    }


    // /**
    //  * @Route("/api-first-access/{user}", name="user_first-access")
    //  */
    // public function firstAccess(User $user, Request $request, UserPasswordEncoderInterface $passwordEncoder)
    // {
    //     if ($user) {
    //         $password = $request->request->get('password');
    //         $encoded = $passwordEncoder->encodePassword($user, $password);
    //         $user->setPassword($encoded);
    //         $user->setTokenActivePassword(null);
    //         $this->saveEntityInDB($user);

    //         return new JsonResponse([
    //             'status' => 'OK',
    //             'code' => 200,
    //         ]);
    //     }
    //     return new JsonResponse([
    //         'status' => "",
    //         'code' => 400,
    //         ""
    //     ]);
    // }


    // /**
    //  * @Route("/admin/change-password/{user}", name="user_change-password")
    //  */
    // public function changePassword(User $user, Request $request, UserPasswordEncoderInterface $passwordEncoder)
    // {
    //     if ($user) {
    //         $password = $request->request->get('password');
    //         $encoded = $passwordEncoder->encodePassword($user, $password);
    //         $user->setPassword($encoded);
    //         $user->setTokenActivePassword("");
    //         $this->saveEntityInDB($user);

    //         return new JsonResponse([
    //             'status' => 'OK',
    //             'code' => 200,
    //         ]);
    //     }
    //     return new JsonResponse([
    //         'status' => "",
    //         'code' => 400,
    //         ""
    //     ]);
    // }

    /**
     * @Route("/api-change-password", name="user_change-password-recover")
     */
    public function changeRecoverPassword(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        $token = $request->request->get('token');
        // $token = 'K7K5UDVUTZ2ABAQ5GQ3N';
        $password = $request->request->get('password');
        // $password = '123456789#';
        $user = $this->getRepository(User::class)->findOneBy(['tokenChangePassword' => $token]);

        if ($user) {

            $encoded = $passwordEncoder->encodePassword($user, $password);
            $user->setPassword($encoded);
            $user->setTokenChangePassword("");
            $this->saveEntityInDB($user);

            return new JsonResponse([
                'status' => 'OK',
                'code' => 200,
            ]);
        }

        return new JsonResponse([
            'status' => "",
            'code' => 400,
            ""
        ]);
    }


    /**
     * @Route("/api-is-valid-token/{token}", name="user_is-valid-token")
     */
    public function isValidToken($token, Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {

        $user = $this->getRepository(User::class)->findOneBy(['tokenChangePassword' => $token]);

        if ($user) {
            return new JsonResponse([
                'status' => 'OK',
                'code' => 200,
            ]);
        }

        return new JsonResponse([
            'status' => "",
            'code' => 400,
            ""
        ]);
    }


    /**
     * @Route("/resetuj-haslo/{token}", name="user_reset-password")
     */
    public function passwordReset($token, Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {

        $user = $this->getRepository(User::class)->findOneBy(['tokenChangePassword' => $token]);

        $viewParameters = [
            // 'errors' => $errors,
            // 'newPassword' => $newPassword,
            // "newPasswordRepeat" => $newPasswordRepeat
            'token' => $token,
        ];
        return $this->render(
            'frontend/views/security/recover-password.html.twig',
            $viewParameters
        );

    }

    /**
     * @Route("/przypomnij-haslo", name="user_recover-password")
     */
    public function passwordRecover(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        // $user = $this->getRepository(User::class)->findOneBy(['tokenChangePassword' => $token]);

        // $errors['changePassword'] = '';
        // $newPassword = $request->request->get('newPassword');
        // $newPasswordRepeat = $request->request->get('newPasswordRepeat');
        // // dd($user->getTokenChangePasswordExpired(),$user->getTokenChangePasswordExpired() >= new \DateTime('now'),new \DateTime('now'));


        // if ($user && ($user->getTokenChangePasswordExpired() >= new \DateTime('now'))) {

        //     if ($request->isMethod('POST')) {


        //         if ($newPasswordRepeat != $newPassword) {
        //             $errors['changePassword'] = "Podane hasła nie są takie same";
        //         }

        //         if ((strlen($newPassword)) == 0 || (strlen($newPasswordRepeat) == 0)) {
        //             $errors['changePassword'] = "Wypełnij wszystkie pola";
        //         }
        //         if (strlen($newPassword) < 8) {
        //             $errors['changePassword'] = "Nowe hasło musi mieć conajmniej 8 znaków";
        //         }

        //         if (strlen($errors['changePassword']) == 0) {
        //             $encoded = $passwordEncoder->encodePassword($user, $newPassword);
        //             $user->setPassword($encoded);
        //             $date = new \DateTime('-9 day');
        //             $user->setTokenChangePasswordExpired($date);
        //             $this->saveEntityInDB($user);
        //             $errors['changePasswordSuccess'] = "Twoje hasło zostało zmienione. Teraz może się zalogować!";
        //         }
        //     }
        //     $errors['displayForm'] = true;
        // } else {
        //     $errors['changePasswordLink'] = "Link potwierdzający zmianę adresu email jest niepoprawny lub wygasł";
        //     $errors['displayForm'] = false;
        // }

        $viewParameters = [
            // 'errors' => $errors,
            // 'newPassword' => $newPassword,
            // "newPasswordRepeat" => $newPasswordRepeat
            // 'token' => $token
        ];
        return $this->render(
            'frontend/views/security/recover-password.html.twig',
            $viewParameters
        );
    }


    /**
     * @Route("/api-check-user-exist", name="user_exist")
     */
    public function checkUserExist(Request $request)
    {
        $email = $request->request->get('email');
        $user = $this->em->getRepository(User::class)->findByEmail($email);
        if (!$user) {
            return new JsonResponse([
                'status' => 'OK',
                'code' => 200,
            ]);
        }
        return new JsonResponse([
            'status' => "",
            'code' => 400,
            ""
        ]);
    }

    /**
     * @Route("/login-facebook", name="login__facebook")
     */
    public function loginFacebook(
        Request $request,
        UserPasswordEncoderInterface $passwordEncoder,
        GuardAuthenticatorHandler $guardHandler,
        LoginFormAuthenticator $authenticator,
        EmailService $emailService
    ) {



        $userRepo = $this->em->getRepository(User::class);

        $email = $request->request->get('email');
        $username = $request->request->get('name');
        $facebookID = $request->request->get('facebookId');
   
        $isNew = false;

        $user = $userRepo->findByFacebookID($facebookID);

        if (!$user) {
            $user = $userRepo->findByEmail($email);
            if (!$user) {
                $user = new User();
                $isNew = true;
            }

            $user->setUsername($username);
            if ($email) {
                $user->setEmail($email);
            }
            if ($isNew) {
                $user->setPassword("password");
            }
            $user->setFacebookID($facebookID);
            $user->setRoles(['ROLE_PATIENT']);
        }


        function slugify($text)
        {
            // replace non letter or digits by -
            $text = preg_replace('~[^\\pL\d]+~u', '-', $text);

            // trim
            $text = trim($text, '-');

            // transliterate
            $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

            // lowercase
            $text = strtolower($text);

            // remove unwanted characters
            $text = preg_replace('~[^-\w]+~', '', $text);

            if (empty($text)) {
                return 'n-a';
            }

            return $text;
        }

        $user->setSlug(slugify($username));

        $this->em->persist($user);
        $this->em->flush();

        // if ($isNew) {
        //     $emailService->sendRegisterUser($user);
        // }


        $guardHandler->authenticateUserAndHandleSuccess(
            $user,
            $request,
            $authenticator,
            'main' // firewall name in security.yaml
        );


        $userProfileUrl = $route = $this->router->generate('panel-patient');

        return new JsonResponse([
            'status' => 'OK',
            'code' => 200,
            'url' => $userProfileUrl
        ]);
    }

/**
     * @Route("/login-google", name="login__google")
     */
    public function loginGoogle(
        Request $request,
        UserPasswordEncoderInterface $passwordEncoder,
        GuardAuthenticatorHandler $guardHandler,
        LoginFormAuthenticator $authenticator,
        EmailService $emailService
    ) {
        $userRepo = $this->em->getRepository(User::class);

        $email = $request->request->get('email');
        // $firstName = $request->request->get('firstName') ? $request->request->get('firstName') : "";
        // $secondName = $request->request->get('secondName') ? $request->request->get('secondName') : "";
        $username = $request->request->get('username');
        $googleID = $request->request->get('googleId');
        $isNew = false;

        // $email = "maciejfiglarz33@gmail.com";
        // $name = "Maciek";
        // $googleID = "107748433381188622097";


        $user = $userRepo->findByGoogleID($googleID);

        //#todo zajęty email, password
        if (!$user) {
            $user = $userRepo->findByEmail($email);
            if (!$user) {
                $user = new User();
                $user->setUsername($username);
                $user->setEmail($email);
                $user->setPassword("password");
            }
            $user->setGoogleID($googleID);
            $user->setRoles(['ROLE_PATIENT']);

            function slugify($text)
            {
                // replace non letter or digits by -
                $text = preg_replace('~[^\\pL\d]+~u', '-', $text);

                // trim
                $text = trim($text, '-');

                // transliterate
                $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

                // lowercase
                $text = strtolower($text);

                // remove unwanted characters
                $text = preg_replace('~[^-\w]+~', '', $text);

                if (empty($text)) {
                    return 'n-a';
                }

                return $text;
            }

            $user->setSlug($username);
            $this->em->persist($user);
            $this->em->flush();
            // if($isNew ){
            //     $emailService->sendRegisterUser($user);
            // }
    
        }

        

        $guardHandler->authenticateUserAndHandleSuccess(
            $user,
            $request,
            $authenticator,
            'main' // firewall name in security.yaml
        );


        // $userProfileUrl = $this->router->generate('user_profile', [
        //     'user' => $user->getId(),
        //     'slug' => $user->getSlug(),
        // ]);

        $userProfileUrl = $route = $this->router->generate('panel-patient');

        return new JsonResponse([
            'status' => 'OK',
            'code' => 200,
            'url' => $userProfileUrl
        ]);
    }



    /**
     * @Route("/zaloguj-sie", name="app_login-page")
     */
    public function loginPage(
    ): Response {


        return $this->render('frontend/views/security/login.html.twig', []);
    }

    /**
     * @Route("/zmieniono-haslo", name="app_change-password-suceess")
     */
    public function passwordChangedPage(
    ): Response {
        return $this->render('frontend/views/security/login.html.twig', []);
    }





    /**
     * @Route("/zaloz-konto", name="app_register-page")
     */
    public function registerPage(
        UserService $userService
    ): Response {

        $user = $this->getUser();
        // $email = $request->request->get('email');
        // $password = $request->request->get('password');

        // if ($user) {
        //     return new JsonResponse([
        //         'status' => 'NOT',
        //         'code' => 400,
        //         'message' => "Podane hasło lub email są niepoprawne",
        //         // 'user' => $this->getUser() ? $this->getUser()->getId() : null,
        //         // 'content' => $request->getMethod() . $email.$password
        //     ]);
        // }

        // if ($userService->isDoctor($user)) {
        //     $this->router->generate('protected-doctor_my-profile', [
        //     ]);

        // }
        return $this->render('frontend/views/security/register.html.twig', []);
    }

    /**
     * @Route("/przypomnij-haslo", name="app_forgotten-password-page")
     */
    public function forgottenPasswordPage(
        UserService $userService
    ): Response {

        $user = $this->getUser();
        // $email = $request->request->get('email');
        // $password = $request->request->get('password');

        // if ($user) {
        //     return new JsonResponse([
        //         'status' => 'NOT',
        //         'code' => 400,
        //         'message' => "Podane hasło lub email są niepoprawne",
        //         // 'user' => $this->getUser() ? $this->getUser()->getId() : null,
        //         // 'content' => $request->getMethod() . $email.$password
        //     ]);
        // }

        // if ($userService->isDoctor($user)) {
        //     $this->router->generate('protected-doctor_my-profile', [
        //     ]);

        // }
        return $this->render('frontend/views/security/forgotten-password.html.twig', []);
    }



    /**
     * @Route("/login", name="app_login", methods={"POST"})
     */
    public function login(
        Request $request,
        UserPasswordEncoderInterface $passwordEncoder,
        GuardAuthenticatorHandler $guardHandler,
        LoginFormAuthenticator $authenticator,
        UserService $userService
    ): Response {

        $user = $this->getUser();
        // $email = $request->request->get('email');
        // $password = $request->request->get('password');

        if (!$user) {
            return new JsonResponse([
                'status' => 'NOT',
                'code' => 400,
                'message' => "Błędne dane!",
                // 'user' => $this->getUser() ? $this->getUser()->getId() : null,
                // 'content' => $request->getMethod() . $email.$password
            ]);
        }
        // $route = $this->router->generate('user_profile', [
        //     'user' => $user->getId(),
        //     'slug' => $user->getSlug(),
        // ]);
        // if ($userService->isDoctor($user)) {

        $route = $this->router->generate('panel-patient');

        if (in_array("ROLE_DOCTOR", $this->getUser()->getRoles())) {
            $route = $this->router->generate('panel-specialist');
        }

        if (in_array("ROLE_ADMIN", $this->getUser()->getRoles())) {
            $route = $this->router->generate('admin');
        }



        // }

        // $userProfileUrl = $this->router->generate('user_profile', [
        //     'user' => $user->getId(),
        //     'slug' => $user->getSlug(),
        // ]);


        return new JsonResponse([
            'status' => 'OK',
            'code' => 200,
            // 'url' => $userService->isAdmin($user) ? $this->router->generate('admin') : $userProfileUrl,
            'url' => $route,
            'user' => $user->getId()
        ]);
    }







    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        $this->session->set('isFakeAccount', false);
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

    /**
     * @Route("/register", name="register")
     */
    public function register(
        Request $request,
        UserPasswordEncoderInterface $passwordEncoder,
        GuardAuthenticatorHandler $guardHandler,
        LoginFormAuthenticator $authenticator,
        EmailService $emailService,
        UserService $userService
    ): Response {
        // username, email, password, confirmPolicy, confirmStatute, confirmMarketing
        $userRepo = $this->em->getRepository(User::class);
        $username = $request->request->get('username');
        $email = $request->request->get('email');
        $password = $request->request->get('password');
        $confirmMarketing = $request->request->get('confirmMarketing');


        $user = $userRepo->findByEmail($email);

        if ($user) {
            return new JsonResponse([
                'status' => '',
                'code' => 400,
                'message' => "Wybrany email jest już zajęty."
            ]);
        }

        $user = new User();
        $user->setUsername($username);
        $user->setEmail($email);
        $user->setPassword(
            $passwordEncoder->encodePassword(
                $user,
                $password
            )
        );


        $polski = $this->em->getRepository(Langue::class)->findByName('polski');
        $type = "";
        if ($polski) {
            $type="polski" . $polski->getId();
            $user->setPatientLangue($polski);
        }

        if (!$polski) {
            $all = $this->em->getRepository(Langue::class)->fetchActive();
            $type="niepolski" . $all[0]->getId();
            $user->setPatientLangue($all[0]);
        }

        $user->setSlug($userService->prepareSlug($username));


        $user->setCreatedAt(new \DateTime('now'));

        $user->setRoles(['ROLE_PATIENT']);

        $this->em->persist($user);
        $this->em->flush();

        $guardHandler->authenticateUserAndHandleSuccess(
            $user,
            $request,
            $authenticator,
            'main' // firewall name in security.yaml
        );

        // $route = $this->router->generate('user_profile', [
        //     'user' => $user->getId(),
        //     'slug' => $user->getSlug(),
        // ]);
        // if ($userService->isDoctor($user)) {


        // if (in_array("ROLE_DOCTOR", $this->getUser()->getRoles())) {
        $route = $this->router->generate('panel-patient');
        // }
        // $emailService->sendRegisterUser($user);

        return new JsonResponse([
            'status' => 'OK',
            'code' => 200,
            'url' => $route,
            'type' => $type
        ]); 

    }



}