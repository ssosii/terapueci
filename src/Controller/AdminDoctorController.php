<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Entity\Price;
use App\Entity\PriceItem;
use App\Entity\DoctorCategory;
use App\Entity\MasterCategory;
use App\Entity\Langue;
use Symfony\Component\HttpFoundation\Request;
use App\Service\FileService;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Service\EmailService;
use App\Service\UserService;
use App\Service\PaginatorService;
use Symfony\Component\HttpFoundation\JsonResponse;


use Symfony\Component\HttpFoundation\Session\Session;


use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

use App\Form\RegistrationFormType;
// use App\Helper\EmailHelper;
// use App\Helper\TokenHelper;


use App\Security\LoginFormAuthenticator;
use App\Service\TokenService;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;

class AdminDoctorController extends BaseSiteController
{
    /**
     * @Route("/admin/specjalisci/{page}", name="admin_doctor")
     */
    public function index(
        EntityManagerInterface $em,
        $page = 1,
        PaginatorService $paginatorService
    ) {
        $query = $em->getRepository(User::class)->queryByRole('ROLE_DOCTOR');

        // $query = $this->em->getRepository(User::class)->queryFetchAll();



        $paginate = $paginatorService->paginate($query, $page, 12);
        return $this->render('admin/views/doctor/list.html.twig', [
            'paginate' => $paginate
        ]);
    }



    /**
     * @Route("/admin/specjalista-{user}/edycja", name="admin_doctor-edit")
     */
    public function edit(User $user, Request $request, EntityManagerInterface $em, UserPasswordEncoderInterface $passwordEncoder)
    {
        // dd($user, $user->getDoctorCategories());
        $error = "";

        if ($request->isMethod('post')) {
            $username = $request->request->get('username');
            $isActive = $request->request->get('isActive');
            $phone = $request->request->get('phone');
            $email = $request->request->get('email');
            $price = $request->request->get('price');
            $price = str_replace(",", ".", trim($price));
            $specialisation = $request->request->get('specialisation');
            $description = $request->request->get('description');
            $password = $request->request->get('password');
            $categories = $request->request->get('categories');
            $categoryEntities = $em->getRepository(DoctorCategory::class)->findFromArray($categories);

            $userExist = $em->getRepository(User::class)->findOneBy(['email' => $email]);

            if (!$userExist || ($userExist ? $user->getEmail() == $userExist->getEmail() : false)) {



                $user->setUsername($username);
                $user->setEmail($email);
                $user->setIsActive($isActive == "on" ? true : false);
                $user->setPhone($phone);
                $user->setPrice($price);
                $user->setDescription($description);
                $user->setSpecialisation($specialisation);


                foreach ($user->getDoctorCategories() as $c) {
                    $user->removeDoctorCategory($c);
                    $em->persist($user);
                }

                foreach ($categoryEntities as $c) {
                    $user->addDoctorCategory($c);
                }


                if ($password) {
                    $encoded = $passwordEncoder->encodePassword($user, $password);
                    $user->setPassword($encoded);
                }

                $em->persist($user);

                $em->flush();
                $this->addFlash('success', 'Dane zostały zapisane poprawnie');
                // return $this->redirect($this->generateUrl('admin_doctor'));
            } else {
                $error = "Wybrany email jest niepoprawny lub istnieje już w bazie danych";
            }
        }

        $preparedUserCategories = [];
        foreach ($user->getDoctorCategories() as $c) {
            $preparedUserCategories[] = $c->getId();
        }



        $viewsParams = [
            'doctor' => $user,
            'categories' => $em->getRepository(DoctorCategory::class)->findBy(['isActive' => true]),
            'preparedUserCategories' => $preparedUserCategories,
            'error' => $error
        ];

        return $this->render('admin/views/doctor/edit.html.twig', $viewsParams);
    }


    /**
     * @Route("/admin/doctor-init-data-edit/{doctor}", name="api_doctor-init-data-for-doctor-edit")
     */
    public function fetchInitDataForDoctor(
        User $doctor,
        UserService $userService,
        Request $request
    ) {



        if ($doctor) {

            $preparedCategories = [];
            $categoriesArray = $this->em->getRepository(DoctorCategory::class)->findBy(['isActive' => true]);

            foreach ($categoriesArray as $category) {

                $mainCategory = $category->getMainCategory()->getName();
                $preparedCategories[$mainCategory][] = ["id" => $category->getId(), "name" => $category->getName()];

            }


            $preparedSelectedCategories = ["service" => [], "specialization" => [], "problem" => [], "langue" => []];

            foreach ($doctor->getDoctorCategories() as $category) {
                $mainCategory = $category->getMainCategory()->getName();
                $preparedSelectedCategories[$mainCategory][] = ["id" => $category->getId(), "name" => $category->getName()];
            }



            $preparedMasterCategories = [];
            $masterCategoriesArray = $this->em->getRepository(MasterCategory::class)->findBy(['isActive' => true]);

            foreach ($masterCategoriesArray as $category) {
                $preparedMasterCategories[] = ["id" => $category->getId(), "name" => $category->getName()];
            }


            $preparedSelectedMasterCategories = [];

            foreach ($doctor->getMasterCategories() as $category) {
                $preparedSelectedMasterCategories[] = ["id" => $category->getId(), "name" => $category->getName()];
            }


            


            $preparedSelectedLangues = [];

            foreach ($doctor->getLangues() as $langue) {
                if ($langue->getIsActive()) {
                    $preparedSelectedLangues[] = $langue->getId();
                }
            }

            $languesEntities = $this->em->getRepository(Langue::class)->findBy(['isActive' => true]);
            $languesList = [];

            foreach ($languesEntities as $langue) {
                $languesList[] = ["id" => $langue->getId(), "name" => $langue->getName()];
            }


            // $pricesList = [];
            // $prices = $this->em->getRepository(Price::class)->fetchActive();
            // foreach ($prices as $price) {
            //     $pricesList[$price->getType()][] = ["id" => $price->getId(), "valueForPatient" => $price->getValueForPatient(), "valueForDoctor" => $price->getValueForDoctor()];
            // }


            // $individualPrice = $doctor->getIndividualPrice();
            // $individualPriceData = null;
            // if ($individualPrice) {
            //     $individualPriceData = $individualPrice->getId();

            // }

            // $crisisPrice = $doctor->getCrisisPrice();
            // $crisisPriceData = null;
            // if ($crisisPrice) {
            //     $crisisPriceData = $crisisPrice->getId();
            // }




            $userData = [
                'userID' => $doctor->getId(),
                'username' => $doctor->getUsername(),
                'email' => $doctor->getEmail(),
                'phone' => $doctor->getPhone(),
                'gender' => $doctor->getGender(),
                'avatar' => $doctor->getAvatarUrl(),

                'about' => $doctor->getAbout(),
                'workwith' => $doctor->getWorkwith(),
                'education' => $doctor->getEducation(),
                'experience' => $doctor->getExperience(),
                'categories' => $preparedSelectedCategories,
                'langues' => $preparedSelectedLangues,
                'masterCategories' => $preparedSelectedMasterCategories
                // 'individualPrice' => $individualPriceData,
                // 'crisisPrice' => $crisisPriceData,

            ];

            return new JsonResponse([
                'status' => "OK",
                'categories' => $preparedCategories,
                'langues' => $languesList,
                'userData' => $userData,
                'masterCategories' => $preparedMasterCategories
                // 'pricesList' => $pricesList
            ]);

        }


        return new JsonResponse([
            'status' => "NOT",
        ]);

    }

    /**
     * @Route("/admin/doctor-init-data", name="api_doctor-init-data-for-doctor")
     */
    public function fetchInitData(
        UserService $userService,
        Request $request
    ) {



        $preparedCategories = [];
        $categoriesArray = $this->em->getRepository(DoctorCategory::class)->findBy(['isActive' => true]);

        foreach ($categoriesArray as $category) {
            // dd($category->getMainCategory());

            $mainCategoryName = $category->getMainCategory()->getName();
            $preparedCategories[$mainCategoryName][] = ["id" => $category->getId(), "name" => $category->getName()];


        }


        $languesEntities = $this->em->getRepository(Langue::class)->findBy(['isActive' => true]);
        $languesList = [];

        foreach ($languesEntities as $langue) {
            $languesList[] = ["id" => $langue->getId(), "name" => $langue->getName()];
        }

        // $pricesList = [];
        // $prices = $this->em->getRepository(Price::class)->fetchActive();
        // foreach ($prices as $price) {
        //     $pricesList[$price->getType()][] = ["id" => $price->getId(), "valueForPatient" => $price->getValueForPatient(), "valueForDoctor" => $price->getValueForDoctor()];
        // }

        $preparedMasterCategories = [];
        $masterCategoriesArray = $this->em->getRepository(MasterCategory::class)->findBy(['isActive' => true]);

        foreach ($masterCategoriesArray as $category) {
            $preparedMasterCategories[] = ["id" => $category->getId(), "name" => $category->getName()];
        }



     
        return new JsonResponse([
            'status' => "OK",
            'categories' => $preparedCategories,
            'langues' => $languesList,
            'masterCategories' => $preparedMasterCategories

        ]);



    }



    /**
     * @Route("/admin/specjalista/dodaj", name="admin_doctor-create")
     */
    public function create(Request $request, EntityManagerInterface $em, EmailService $emailService, FileService $fileService, UserPasswordEncoderInterface $passwordEncoder)
    {


        function randomPassword()
        {
            $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
            $pass = array(); //remember to declare $pass as an array
            $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
            for ($i = 0; $i < 8; $i++) {
                $n = rand(0, $alphaLength);
                $pass[] = $alphabet[$n];
            }
            return implode($pass); //turn the array into a string
        }

        $error = "";

        if ($request->isMethod('post')) {
            $file = $request->files->get('avatar');
            $username = $request->request->get('username');
            $email = $request->request->get('email');
            $phone = $request->request->get('phone');
            $price = $request->request->get('price');
            $price = str_replace(",", ".", trim($price));
            $description = $request->request->get('description');
            $password = $request->request->get('password');
            $categories = $request->request->get('categories');
            $specialisation = $request->request->get('specialisation');
            $categoryEntities = $em->getRepository(DoctorCategory::class)->findFromArray($categories);
            $userExist = $em->getRepository(User::class)->findOneBy(['email' => $email]);

            if ($email && !$userExist) {


                $user = new User();
                $user->setUsername($username);
                $user->setIsActive(true);
                $user->setPhone($phone);
                $user->setPrice($price);
                $user->setEmail($email);
                $user->setRoles(['ROLE_DOCTOR']);
                $user->setDescription($description);
                $user->setSpecialisation($specialisation);
                $encoded = $passwordEncoder->encodePassword($user, $password);
                $user->setPassword($encoded);



                $user->getDoctorCategories()->clear();
                foreach ($categoryEntities as $c) {
                    $user->addDoctorCategory($c);
                }


                $em->persist($user);
                $em->flush();

                if ($file) {
                    $fileService->upload($file, User::FILES_AVATAR_LOCATION, $user->getId());
                    $user->setAvatar($user->getId() . '.' . $fileService->getExtension());
                    $em->persist($user);
                    $em->flush();
                }
                $data = [
                    'date' => $username,
                    'email' => $email,
                    'password' => $password,

                ];


                // $emailService->sendConfiguratorUserCreated($user, $data);

                $this->addFlash('success', 'Dane zostały zapisane poprawnie');
                return $this->redirect($this->generateUrl('admin_doctor'));
            } else {
                $error = "Wybrany email jest niepoprawny lub istnieje już w bazie danych";
            }
        }


        $viewsParams = [
            'randomPassword' => randomPassword(),
            'categories' => $em->getRepository(DoctorCategory::class)->findBy(['isActive' => true]),
            'error' => $error
        ];

        return $this->render('admin/views/doctor/create.html.twig', $viewsParams);
    }
    /**
     * @Route("/admin/api-doctor-toggle-active/{id}",name="admin_api-doctor-toggle")
     */
    public function userToggleActive(User $user)
    {
        if ($user) {
            $user->setIsActive(!$user->getIsActive());
            $this->em->persist($user);
            $this->em->flush();
        }

        return new JsonResponse(['status' => "OK"]);
    }
 /**
     * @Route("/admin/api-doctor-toggle-highligthed/{id}",name="admin_api-doctor-toggle-highlighted")
     */
    public function userToggleHighlighted(User $user)
    {
        if ($user) {
            $user->setIsHighlighted(!$user->getIsHighlighted());
            $this->em->persist($user);
            $this->em->flush();
        }

        return new JsonResponse(['status' => "OK"]);
    }


    /**
     * @Route("/admin/create-doctor",name="api-create-doctor")
     */
    public function createDoctor(
        Request $request, FileService $fileService,
        UserPasswordEncoderInterface $passwordEncoder,
        GuardAuthenticatorHandler $guardHandler,
        LoginFormAuthenticator $authenticator,
        EmailService $emailService,
        UserService $userService
    ): Response {

        $userRepo = $this->em->getRepository(User::class);

        $password = $request->request->get('password');


        $username = $request->request->get('username');
        $email = $request->request->get('email');
        $phone = $request->request->get('phone');
        $gender = $request->request->get('gender');
        $about = $request->request->get('about');
        $workwith = $request->request->get('workwith');
        $education = $request->request->get('education');
        $experience = $request->request->get('experience');
        $langues = $request->request->get('langues');
        $categories = $request->request->get('categories');
        $categories = json_decode($categories, true);

        $masterCategories = $request->request->get('masterCategories');
        $masterCategories = json_decode($masterCategories, true);

        // $password = $request->request->get('password');

        // $password = "password";
        // $username = 'username';
        // $email = 'email2222';
        // $phone = 'phone';
        // $gender = 'gender';
        // $about = 'about';
        // $workwith = 'workwith';
        // $education = 'education';
        // $experience = 'experience';
        // $categories = 'categories';
        // $langues = 'langues';
        // $categories = $request->request->get('categories');
        // $categories = json_decode($categories, true);


        $user = $userRepo->findByEmail($email);

        if ($user) {
            return new JsonResponse([
                'status' => '',
                'code' => 400,
                'message' => "Wybrany email jest już zajęty."
            ]);
        }

        $user = new User();
        $user->setSlug($userService->prepareSlug($username));
        $user->setUsername($username);
        $user->setEmail($email);
        $user->setPassword(
            $passwordEncoder->encodePassword(
                $user,
                $password
            )
        );

        $user->setUsername($username);
        $user->setEmail($email);
        $user->setPhone($phone);
        $user->setGender($gender);
        $user->setAbout($about);
        $user->setWorkwith($workwith);
        $user->setEducation($education);
        $user->setExperience($experience);



        $categoryEntities = $this->em->getRepository(DoctorCategory::class)->findFromArray($categories);

        foreach ($categoryEntities as $c) {
            $user->addDoctorCategory($c);
        }


        $languesArray = explode(",", $langues);
        $languesEntities = $this->em->getRepository(Langue::class)->findFromArray($languesArray);

        foreach ($languesEntities as $l) {
            $user->addLangue($l);
        }


        // $terapiaIndywidualna = $request->request->get("terapia-indywidualna");
        // $interwencjaKryzysowa = $request->request->get("interwencja-kryzysowa");
        // // $terapiaIndywidualna = "13";
        // // $interwencjaKryzysowa = "18";

        // $priceIndividual = $this->em->getRepository(Price::class)->findOneBy(['id' => $terapiaIndywidualna]);
        // if ($priceIndividual) {
        //     $user->setIndividualPrice($priceIndividual);
        // }

        // $priceCrisis = $this->em->getRepository(Price::class)->findOneBy(['id' => $interwencjaKryzysowa]);
        // if ($priceCrisis) {
        //     $user->setCrisisPrice($priceCrisis);
        // }


        $price = $this->em->getRepository(Price::class)->findOneBy(["isActive" => true]);
        $masterCategoriesEntities = $this->em->getRepository(MasterCategory::class)->findFromArray($masterCategories);

        foreach ($user->getMasterCategories() as $c) {
            if (!in_array($c->getId(), $masterCategories)) {
                $user->removeMasterCategory($c);

                $priceItem = $this->em->getRepository(PriceItem::class)->findOneByParams($user, $c);
                if ($priceItem) {
                    $this->em->remove($priceItem);
                }
                $this->em->persist($user);
            }
        }

        foreach ($masterCategoriesEntities as $c) {
            if (!$user->getMasterCategories()->contains($c)) {
                $user->addMasterCategory($c);
                $priceItem = new PriceItem();
                $priceItem->setPrice($price);
                $priceItem->setMasterCategory($c);
                $priceItem->setDoctor($user);
                $this->em->persist($priceItem);
            }
        }





        $user->setCreatedAt(new \DateTime('now'));

        $user->setRoles(['ROLE_DOCTOR']);

        $this->em->persist($user);
        $this->em->flush();




        return new JsonResponse(['status' => "OK"]);


    }


    /**
     * @Route("/admin/update-doctor/{doctor}", name="api_admin-update-doctor1")
     */
    public function updateDoctor(
        User $doctor,
        UserService $userService,
        Request $request
    ) {


        $username = $request->request->get('username');
        $phone = $request->request->get('phone');
        $gender = $request->request->get('gender');
        $about = $request->request->get('about');
        $workwith = $request->request->get('workwith');
        $education = $request->request->get('education');
        $experience = $request->request->get('experience');
        $langues = $request->request->get('langues');
        $categories = $request->request->get('categories');
        $categories = json_decode($categories, true);

        $masterCategories = $request->request->get('masterCategories');
        $masterCategories = json_decode($masterCategories, true);

        // $password = $request->request->get('password');        $password = "password";
        // $username = 'username';
        // $phone = 'phone';
        // $gender = 'gender';
        // $about = 'about';
        // $workwith = 'workwith';
        // $education = 'education';
        // $experience = 'experience';
        // $categories = 'categories';
        // $langues = 'langues';
        // $categories = $request->request->get('categories');
        // $categories = json_decode($categories, true);


        $doctor->setSlug($userService->prepareSlug($username));
        $doctor->setUsername($username);



        $doctor->setUsername($username);
        $doctor->setPhone($phone);
        $doctor->setGender($gender);
        $doctor->setAbout($about);
        $doctor->setWorkwith($workwith);
        $doctor->setEducation($education);
        $doctor->setExperience($experience);



        $categoryEntities = $this->em->getRepository(DoctorCategory::class)->findFromArray($categories);

        foreach ($doctor->getDoctorCategories() as $c) {
            $doctor->removeDoctorCategory($c);
            $this->em->persist($doctor);
        }

        foreach ($categoryEntities as $c) {
            $doctor->addDoctorCategory($c);
        }

        $languesArray = explode(",", $langues);
        $languesEntities = $this->em->getRepository(Langue::class)->findFromArray($languesArray);

        foreach ($doctor->getLangues() as $l) {
            $doctor->removeLangue($l);
            $this->em->persist($doctor);
        }

        foreach ($languesEntities as $l) {
            $doctor->addLangue($l);
        }

        $price = $this->em->getRepository(Price::class)->findOneBy(["isActive" => true]);
        $masterCategoriesEntities = $this->em->getRepository(MasterCategory::class)->findFromArray($masterCategories);

        foreach ($doctor->getMasterCategories() as $c) {
            if (!in_array($c->getId(), $masterCategories)) {
                $doctor->removeMasterCategory($c);

                $priceItem = $this->em->getRepository(PriceItem::class)->findOneByParams($doctor, $c);
                if ($priceItem) {
                    $this->em->remove($priceItem);
                }
                $this->em->persist($doctor);
            }
        }

        foreach ($masterCategoriesEntities as $c) {
            if (!$doctor->getMasterCategories()->contains($c)) {
                $doctor->addMasterCategory($c);
                $priceItem = new PriceItem();
                $priceItem->setPrice($price);
                $priceItem->setMasterCategory($c);
                $priceItem->setDoctor($doctor);
                $this->em->persist($priceItem);
            }
        }




        // $terapiaIndywidualna = $request->request->get("terapia-indywidualna");
        // $interwencjaKryzysowa = $request->request->get("interwencja-kryzysowa");
        // // $terapiaIndywidualna = "13";
        // // $interwencjaKryzysowa = "18";

        // $priceIndividual = $this->em->getRepository(Price::class)->findOneBy(['id' => $terapiaIndywidualna]);
        // if ($priceIndividual) {
        //     $doctor->setIndividualPrice($priceIndividual);
        // }

        // $priceCrisis = $this->em->getRepository(Price::class)->findOneBy(['id' => $interwencjaKryzysowa]);
        // if ($priceCrisis) {
        //     $doctor->setCrisisPrice($priceCrisis);
        // }



        $doctor->setRoles(['ROLE_DOCTOR']);

        $this->em->persist($doctor);
        $this->em->flush();




        return new JsonResponse(['status' => "OK"]);

    }

    /**
     * @Route("/admin/change-password/{doctor}", name="api_admin-change-password-doctor")
     */
    public function changePassword(
        User $doctor,
        UserService $userService,
        Request $request,
        UserPasswordEncoderInterface $passwordEncoder
    ) {

        $password = $request->request->get('password');
        $encoded = $passwordEncoder->encodePassword($doctor, $password);
        $doctor->setPassword($encoded);
        $this->saveEntityInDB($doctor);

        return new JsonResponse([
            'status' => 'OK',
            'code' => 200,
        ]);

    }

    /**
     * @Route("/admin/change-email/{doctor}", name="api_admin-change-email-doctor")
     */
    public function changeEmail(
        User $doctor,
        UserService $userService,
        Request $request,
        UserPasswordEncoderInterface $passwordEncoder
    ) {


        $email = $request->request->get('email');

        $currentEmail = $doctor->getEmail();
        if($currentEmail !== $email){
            $isExist = $this->em->getRepository(User::class)->findByEmail($email);
            if($isExist){
                return new JsonResponse([
                    'status' => 'NOT',
                    'code' => 400,
                    'message' => "Wybrany email jest już zajęty."
                ]);
            }
            $doctor->setEmail($email);
        }


        $this->saveEntityInDB($doctor);

        return new JsonResponse([
            'status' => 'OK',
            'code' => 200,
        ]);

    }


    /**
     * @Route("/admin/api-doctor-upload-avatar/{user}",name="api-admin-doctor-avatar-upload")
     */
    public function upload(User $user, Request $request, FileService $fileService)
    {

        $file = $request->files->get('file');
        $fileToRemove = $request->request->get('fileToRemove');
        $remove = 0;
        if ($file) {

            $newFileName = $fileService->generateUniqueFileName() . $user->getId() . "." . $fileService->getExtensionFromFileObject($file);

            if ($fileToRemove) {
                $remove = 1;
                $fileService->removeFile($fileToRemove, true);
            }

            $fileName = $fileService->uploadOryginalName($file, '/upload/avatar/', $newFileName);


            $user->setAvatar($fileName);
            $this->em->persist($user);


            $this->em->flush();
            return new JsonResponse([
                'status' => 'OK',
                'code' => 200,
                'message' => "Wszystko ok",
                'fileUrl' => "/upload/avatar/" . $fileName,
                'fileToRemove' => $fileToRemove,
                'userID' => $user->getId(),
                'remove' => $remove
            ]);
        }

        return new JsonResponse([
            'status' => '',
            'code' => 400,
            'message' => "Cos poszło nie tak"
        ]);

    }
}