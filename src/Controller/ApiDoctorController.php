<?php

namespace App\Controller;

use App\Entity\AppointmentRule;
use App\Entity\DoctorCategory;
use App\Entity\MasterCategory;
use App\Entity\PriceItem;
use App\Entity\User;
use App\Entity\Langue;
use App\Entity\Price;

use App\Entity\AppointmentOrder;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Service\UserService;
use App\Service\FileService;
use App\Service\AppoitmentService;
use App\Service\EmailService;


class ApiDoctorController extends BaseSiteController
{

    /**
     * @Route("/display-appointment-rules", name="api_appointment-rules21")
     */
    public function displayAppointment(Request $request)
    {
        $categories = $this->em->getRepository(AppointmentRule::class)->findAll();
        dd($categories);

    }


    /**
     * @Route("/api-fetch-doctors-list-init-data", name="api_fetch-doctors-list-init-data")
     */
    public function fetchDoctorsListInitData(Request $request, AppoitmentService $appoitmentService, UserService $userService)
    {


        // $prices = $this->em->getRepository(Price::class)->fetchActive();
        // $pricesList = [];

        // foreach ($prices as $price) {
        //     $pricesList[$price->getType()][] = ["id" => $price->getId(), "valueForPatient" => $price->getValueForPatient(), "valueForDoctor" => $price->getValueForDoctor()];
        // }


        $categories = $this->em->getRepository(DoctorCategory::class)->fetchActive();
        $categoriesList = [];
        foreach ($categories as $category) {
            $categoriesList[$category->getMainCategory()->getName()][] = ["id" => $category->getId(), "name" => $category->getName()];
        }

        $masterCategories = $this->em->getRepository(MasterCategory::class)->fetchActive();
        $masterCategoriesList = [];
        foreach ($masterCategories as $masterCategory) {
            $masterCategoriesList[] = ["id" => $masterCategory->getId(), "name" => $masterCategory->getName()];
        }
        $categoriesList['masterCategories'] = $masterCategoriesList;

        $langueList = [];
        $langues = $this->em->getRepository(Langue::class)->fetchActive();

        foreach ($langues as $langue) {
            $langueList[] = ["id" => $langue->getId(), "name" => $langue->getName()];
        }

        $categoriesList["langue"] = $langueList;

        $isDoctor = $userService->isDoctor();


        return new JsonResponse([
            'status' => "OK",
            'categoriesList' => $categoriesList,
            'isDoctor' => $isDoctor,
            // 'masterCategoriesList' => $masterCategoriesList
        ]);

    }





    /**
     * @Route("/api-fetch-doctor-by-string", name="api-fetch-doctor-by-string")
     */
    public function fetchDoctorByString(Request $request, UserService $userService, AppoitmentService $appoitmentService)
    {
        $value = $request->request->get('searcherValue');
        $value = 'tes';
        $doctors = $this->em->getRepository(User::class)->searcherByString($value);

        // $doctorsList = $userService->prepareDoctorForList($doctors);

        $doctorsList = [];
        foreach ($doctors as $doctor) {

            $priceItems = $doctor->getPriceItems();
            $priceItemsList = [];

            foreach ($priceItems as $priceItem) {
                $price = $priceItem->getPrice();
                $masterCategory = $priceItem->getMasterCategory();

                $priceItemsList[] = ['priceItem' => $priceItem->getId(), 'price' => $price->getId(), 'valueForPatient' => $price->getValueForPatient(), 'name' => $masterCategory->getName()];


            }


            if (count($priceItemsList) > 0) {


                $appointments = $this->em->getRepository(AppointmentRule::class)->fetchNotUsedMin24hAndTo3Months($doctor);
                $appointmentsList = [];
                foreach ($appointments as $appointment) {
                    $date = $appointment->getStartDate()->format("Y-m-d");
                    $dateToDisplay = $appointment->getStartDate()->format("d.m");
                    $dayOfWeek = $appointment->getStartDate()->format("N");

                    if (!isset($appointmentsList[$date])) {
                        // Jeśli data nie istnieje w tablicy, to tworzymy nową pozycję
                        $appointmentsList[$date] = [
                            "date" => $dateToDisplay,
                            "dayOfWeek" => $dayOfWeek,
                            "list" => []
                        ];
                    }

                    // Dodajemy termin do listy w odpowiedniej grupie daty
                    $appointmentsList[$date]["list"][] = $appoitmentService->normalizeAppointmentEntity($appointment);
                }


                foreach ($appointmentsList as &$dateData) {
                    if (isset($dateData['list'])) {
                        usort($dateData['list'], function ($a, $b) {
                            $startHourA = $a['startHour'];
                            $startHourB = $b['startHour'];

                            if ($startHourA == $startHourB) {
                                return 0;
                            }

                            return ($startHourA < $startHourB) ? -1 : 1;
                        });
                    }
                }

                ksort($appointmentsList);



                $categoriesList = [];

                foreach ($doctor->getDoctorCategories() as $category) {
                    if ($category->getIsActive()) {
                        $categoriesList[$category->getMainCategory()->getName()][] = $category->getName();
                    }
                }

                $mastersCategoriesList = [];

                foreach ($doctor->getMasterCategories() as $masterCategory) {
                    if ($masterCategory->getIsActive()) {
                        $mastersCategoriesList[] = $masterCategory->getName();
                    }
                }

                $languesList = [];

                foreach ($doctor->getLangues() as $langue) {
                    if ($langue->getIsActive()) {
                        $languesList[] = $langue->getName();
                    }

                }



                // dd("kkk", $categoriesList);
                $doctorsList[] = [
                    "id" => $doctor->getId(),
                    "slug" => $doctor->getSlug(),
                    "categories" => $doctor->getDoctorCategories(),
                    'username' => $doctor->getUsername(),
                    'about' => $doctor->getAbout(),
                    'avatarUrl' => $doctor->getAvatarUrl(),
                    'appoitments' => $appointmentsList,
                    'categoriesList' => $categoriesList,
                    'languesList' => $languesList,
                    'priceItemsList' => $priceItemsList,
                    'masterCategories' => $mastersCategoriesList
                    // 'individualPrice' => $individualPriceData,
                    // 'crisisPrice' => $crisisPriceData
                ];
            }
        }


        return new JsonResponse([
            'status' => "OK",
            'doctorsList' => $doctorsList
        ]);

    }



    /**
     * @Route("/api-fetch-doctor-by-categories-ranges", name="api-fetch-doctor-by-categories-ranges")
     */
    public function fetchDoctorByCategoriesAndRanges(Request $request, UserService $userService)
    {
        $categories = $request->request->get('categories');
        $categoriesArray = json_decode($categories, true);

        $langues = $request->request->get('langues');
        $languesArray = json_decode($langues, true);

        $genders = $request->request->get('gender');
        $gendersArray = json_decode($genders, true);


        $weekDays = '["5"]';
        $weekDaysArray = json_decode($weekDays, true);
        // $rangse
        $ranges = $request->request->get('ranges');
        $ranges = '["18-21"]';
        $rangesArray = json_decode($ranges, true);

        // dd($rangesArray);



        $doctors = $this->em->getRepository(User::class)->searcherByCategoriesAndRanges($categoriesArray, $languesArray, $gendersArray, $weekDaysArray, $rangesArray);
        $app = $this->em->getRepository(AppointmentRule::class)->findAll();
        // dd($doctors[0]->getAppointmentRules());
        foreach ($doctors as $doctor) {
            $appointmentRules = $doctor->getAppointmentRules();
            $array = [];
            foreach ($appointmentRules as $rule) {
                $array[] = $rule;
            }
            // dd($array, $app);
        }
        $doctorsList = $userService->prepareDoctorForList($doctors);



        return new JsonResponse([
            'status' => "OK",
            'doctorsList' => $doctorsList,
            'categories' => $categories
        ]);



    }



    /**
     * @Route("/api-fetch-doctors-list/{page}", name="api_fetch-doctors-list")
     */
    public function fetchDoctorsList($page = 1, Request $request, AppoitmentService $appoitmentService)
    {
        // $doctor = $this->getUser();
        $data = json_decode($request->getContent(), true);


        $masterCategories = $data['masterCategories'] ?? null;
        // $categories  ="[7]";
        $masterCategoriesArray = json_decode($masterCategories, true);

        // $categories = $request->request->get('categories');
        $categories = $data['categories'] ?? null;
        // $categories  ="[7]";
        $categoriesArray = json_decode($categories, true);

        // $langues = $request->request->get('langues');
        $langues = $data['langues'] ?? null;
        // $langues = '[1,2]';
        $languesArray = json_decode($langues, true);
        // dd($languesArray);
        // $genders = $request->request->get('gender');
        $genders = $data['gender'] ?? null;
        $gendersArray = json_decode($genders, true);


        $weekDays = $data['weekDays'] ?? null;
        $weekDaysArray = json_decode($weekDays, true);
        // $weekDaysArray =  [2];
        // dd($weekDaysArray);
        // $rangse
        $ranges = $data['ranges'] ?? null;
        // $ranges = '["18-21"]';
        $rangesArray = json_decode($ranges, true);
        // $rangesArray = [15];

        // dd($rangesArray);



        $doctors = $this->em->getRepository(User::class)->searcherByCategoriesAndRanges($page, $masterCategoriesArray, $categoriesArray, $languesArray, $gendersArray, $weekDaysArray, $rangesArray);
        // dd($doctors);
        // foreach($doctors as $doctor){
        //     $list = [];
        //     $categories = $doctor->getDoctorCategories();
        //     foreach($categories as $category){
        //         $list[] = $category;
        //     }
        //     dd($list,$doctor);
        // }
        // $doctors = $this->em->getRepository(User::class)->fetchByRolePagination('ROLE_DOCTOR',$page);
        // $doctors = $this->em->getRepository(User::class)->fetchByRoleActive('ROLE_DOCTOR');
        // $tommorow = new \DateTime('tomorrow', new \DateTimeZone('Europe/Warsaw'));
        // dd($tommorow);

        $list = [];


        foreach ($doctors as $doctor) {

            $priceItems = $doctor->getPriceItems();
            $priceItemsList = [];

            foreach ($priceItems as $priceItem) {
                $price = $priceItem->getPrice();
                $masterCategory = $priceItem->getMasterCategory();

                $priceItemsList[] = ['priceItem' => $priceItem->getId(), 'price' => $price->getId(), 'valueForPatient' => $price->getValueForPatient(), 'name' => $masterCategory->getName()];


            }


            if (count($priceItemsList) > 0) {


                //appointments

                $appointments = $this->em->getRepository(AppointmentRule::class)->fetchNotUsedMin24hAndTo3Months($doctor);
                $appointmentsList = [];
                foreach ($appointments as $appointment) {
                    $date = $appointment->getStartDate()->format("Y-m-d");
                    $dateToDisplay = $appointment->getStartDate()->format("d.m");
                    $dayOfWeek = $appointment->getStartDate()->format("N");

                    if (!isset($appointmentsList[$date])) {
                        // Jeśli data nie istnieje w tablicy, to tworzymy nową pozycję
                        $appointmentsList[$date] = [
                            "date" => $dateToDisplay,
                            "dayOfWeek" => $dayOfWeek,
                            "list" => []
                        ];
                    }

                    // Dodajemy termin do listy w odpowiedniej grupie daty
                    $appointmentsList[$date]["list"][] = $appoitmentService->normalizeAppointmentEntity($appointment);
                }


                foreach ($appointmentsList as &$dateData) {
                    if (isset($dateData['list'])) {
                        usort($dateData['list'], function ($a, $b) {
                            $startHourA = $a['startHour'];
                            $startHourB = $b['startHour'];

                            if ($startHourA == $startHourB) {
                                return 0;
                            }

                            return ($startHourA < $startHourB) ? -1 : 1;
                        });
                    }
                }


                foreach ($appointmentsList as &$dateData) {
                    if (isset($dateData['list'])) {
                        usort($dateData['list'], function ($a, $b) {
                            $startHourA = $a['startHour'];
                            $startHourB = $b['startHour'];

                            if ($startHourA == $startHourB) {
                                return 0;
                            }

                            return ($startHourA < $startHourB) ? -1 : 1;
                        });
                    }
                }



                ksort($appointmentsList);

                //categories

                $categoriesList = [];

                foreach ($doctor->getDoctorCategories() as $category) {
                    if ($category->getIsActive()) {
                        $categoriesList[$category->getMainCategory()->getName()][] = $category->getName();
                    }
                }

                //master categories

                $mastersCategoriesList = [];

                foreach ($doctor->getMasterCategories() as $masterCategory) {
                    if ($masterCategory->getIsActive()) {
                        $mastersCategoriesList[] = $masterCategory->getName();
                    }
                }

                //langues

                $languesList = [];

                foreach ($doctor->getLangues() as $langue) {
                    if ($langue->getIsActive()) {
                        $languesList[] = $langue->getName();
                    }

                }



                // dd("kkk", $appointmentsList);
                $list[] = [
                    "id" => $doctor->getId(),
                    "slug" => $doctor->getSlug(),
                    "categories" => $doctor->getDoctorCategories(),
                    'username' => $doctor->getUsername(),
                    'about' => $doctor->getAbout(),
                    'avatarUrl' => $doctor->getAvatarUrl(),
                    'appoitments' => $appointmentsList,
                    'categoriesList' => $categoriesList,
                    'languesList' => $languesList,
                    'priceItemsList' => $priceItemsList,
                    'masterCategories' => $mastersCategoriesList
                    // 'individualPrice' => $individualPriceData,
                    // 'crisisPrice' => $crisisPriceData
                ];
            }
        }



        // dd($appointmentsList);
        return new JsonResponse([
            'status' => "OK",
            'doctorsList' => $list,
            'languesArray' => $weekDaysArray,
            '$gendersArray' => $gendersArray,
            '$rangesArray' => $rangesArray
        ]);
    }


    /**
     * @Route("/api-fetch-single-doctor/{doctor}", name="api_fetch-single-doctor")
     */
    public function fetchSingleDoctor(User $doctor, Request $request, AppoitmentService $appoitmentService)
    {




        $priceItems = $doctor->getPriceItems();
        $priceItemsList = [];

        foreach ($priceItems as $priceItem) {
            $price = $priceItem->getPrice();
            // dd($priceItem->getId());
            $masterCategory = $priceItem->getMasterCategory();

            $priceItemsList[] = ['priceItem' => $priceItem->getId(), 'price' => $price->getId(), 'valueForPatient' => $price->getValueForPatient(), 'name' => $masterCategory->getName()];


        }


        if (count($priceItemsList) > 0) {

            //appointments

            $appointments = $this->em->getRepository(AppointmentRule::class)->fetchNotUsedMin24hAndTo3Months($doctor);
            $appointmentsList = [];
            foreach ($appointments as $appointment) {
                $date = $appointment->getStartDate()->format("Y-m-d");
                $dateToDisplay = $appointment->getStartDate()->format("d.m");
                $dayOfWeek = $appointment->getStartDate()->format("N");

                if (!isset($appointmentsList[$date])) {
                    // Jeśli data nie istnieje w tablicy, to tworzymy nową pozycję
                    $appointmentsList[$date] = [
                        "date" => $dateToDisplay,
                        "dayOfWeek" => $dayOfWeek,
                        "list" => []
                    ];
                }

                // Dodajemy termin do listy w odpowiedniej grupie daty
                $appointmentsList[$date]["list"][] = $appoitmentService->normalizeAppointmentEntity($appointment);
            }


            foreach ($appointmentsList as &$dateData) {
                if (isset($dateData['list'])) {
                    usort($dateData['list'], function ($a, $b) {
                        $startHourA = $a['startHour'];
                        $startHourB = $b['startHour'];

                        if ($startHourA == $startHourB) {
                            return 0;
                        }

                        return ($startHourA < $startHourB) ? -1 : 1;
                    });
                }
            }

            ksort($appointmentsList);


            $categoriesList = [];

            foreach ($doctor->getDoctorCategories() as $category) {
                if ($category->getIsActive()) {
                    $categoriesList[$category->getMainCategory()->getName()][] = $category->getName();
                }
            }

            $mastersCategoriesList = [];

            foreach ($doctor->getMasterCategories() as $masterCategory) {
                if ($masterCategory->getIsActive()) {
                    $mastersCategoriesList[] = $masterCategory->getName();
                }
            }

            $languesList = [];

            foreach ($doctor->getLangues() as $langue) {
                if ($langue->getIsActive()) {
                    $languesList[] = $langue->getName();
                }

            }



            // dd("kkk", $categoriesList);
            $list = [
                "id" => $doctor->getId(),
                "slug" => $doctor->getSlug(),
                "categories" => $doctor->getDoctorCategories(),
                'username' => $doctor->getUsername(),
                'about' => $doctor->getAbout(),
                'avatarUrl' => $doctor->getAvatarUrl(),
                'appoitments' => $appointmentsList,
                'categoriesList' => $categoriesList,
                'languesList' => $languesList,
                'priceItemsList' => $priceItemsList,
                'masterCategories' => $mastersCategoriesList,
                'workWith' => $doctor->getWorkwith(),
                'education' => $doctor->getEducation(),
                'experience' => $doctor->getExperience(),
            ];
        }


        return new JsonResponse([
            'status' => "OK",
            'doctor' => $list
        ]);


        // $individualPrice = $doctor->getIndividualPrice();
        // $individualPriceData = null;
        // if ($individualPrice) {
        //     // $individualPriceData = $individualPrice->getId();
        //     $individualPriceData = [
        //         "id" => $individualPrice->getId(),
        //         "valueForDoctor" => $individualPrice->getValueForDoctor(),
        //         "valueForPatient" => $individualPrice->getValueForPatient(),
        //     ];
        // }

        // $crisisPrice = $doctor->getCrisisPrice();
        // $crisisPriceData = null;
        // if ($crisisPrice) {
        //     // $crisisPriceData = $crisisPrice->getId();
        //     $crisisPriceData = [
        //         "id" => $crisisPrice->getId(),
        //         "valueForDoctor" => $crisisPrice->getValueForDoctor(),
        //         "valueForPatient" => $crisisPrice->getValueForPatient(),
        //     ];
        // }


        // $appointments = $this->em->getRepository(AppointmentRule::class)->fetchNotUsedMin24hAndTo3Months($doctor);
        // $appointmentsList = [];
        // foreach ($appointments as $appointment) {
        //     $date = $appointment->getStartDate()->format("Y-m-d");
        //     $dateToDisplay = $appointment->getStartDate()->format("d.m");
        //     $dayOfWeek = $appointment->getStartDate()->format("N");

        //     if (!isset($appointmentsList[$date])) {
        //         // Jeśli data nie istnieje w tablicy, to tworzymy nową pozycję
        //         $appointmentsList[$date] = [
        //             "date" => $dateToDisplay,
        //             "dayOfWeek" => $dayOfWeek,
        //             "list" => []
        //         ];
        //     }

        //     // Dodajemy termin do listy w odpowiedniej grupie daty
        //     $appointmentsList[$date]["list"][] = $appoitmentService->normalizeAppointmentEntity($appointment);
        // }

        // $categoriesList = [];

        // foreach ($doctor->getDoctorCategories() as $category) {
        //     if ($category->getIsActive()) {
        //         $categoriesList[$category->getMainCategory()->getName()][] = $category->getName();
        //     }
        // }

        // $languesList = [];

        // foreach ($doctor->getLangues() as $langue) {
        //     if ($langue->getIsActive()) {
        //         $languesList[] = $langue->getName();
        //     }

        // }


        // ksort($appointmentsList);
        // // dd("kkk", $categoriesList);
        // $list = [
        //     "id" => $doctor->getId(),
        //     "slug" => $doctor->getSlug(),
        //     "categories" => $doctor->getDoctorCategories(),
        //     'username' => $doctor->getUsername(),

        //     'about' => $doctor->getAbout(),
        //     'workWith' => $doctor->getWorkwith(),
        //     'education' => $doctor->getEducation(),
        //     'experience' => $doctor->getExperience(),

        //     'avatarUrl' => $doctor->getAvatarUrl(),
        //     'appoitments' => $appointmentsList,
        //     'categoriesList' => $categoriesList,
        //     'languesList' => $languesList,
        //     'individualPrice' => $individualPriceData,
        //     'crisisPrice' => $crisisPriceData
        // ];


        // return new JsonResponse([
        //     'status' => "OK",
        //     'doctor' => $list
        // ]);
    }


    /**
     * @Route("/api-fetch-data-for-change-appointments/{doctor}", name="api_fetch-data-for-change-appointment")
     */
    public function fetchAppointmentsForDoctor(User $doctor, Request $request, AppoitmentService $appoitmentService)
    {
        $appointments = $this->em->getRepository(AppointmentRule::class)->fetchNotUsedMin24hAndTo3Months($doctor);
        $appointmentsList = [];





        $masterCategoriesList = [];
        foreach ($doctor->getMasterCategories() as $masterCategory) {
            $priceItem = $this->em->getRepository(PriceItem::class)->findOneByParams($doctor, $masterCategory);
            $price = $priceItem->getPrice();
            $masterCategoriesList[] =
                [
                    'masterCategory' => $masterCategory->getId(),
                    'name' => $masterCategory->getName(),
                    'selectedPriceItem' => $priceItem->getId(),
                    'selectedPrice' => $price->getId(),
                    'valueForPatient' => $price->getValueForPatient()
                ];
        }



        foreach ($appointments as $appointment) {
            $date = $appointment->getStartDate()->format("Y-m-d");
            $dateToDisplay = $appointment->getStartDate()->format("d.m");
            $dayOfWeek = $appointment->getStartDate()->format("N");

            if (!isset($appointmentsList[$date])) {
                // Jeśli data nie istnieje w tablicy, to tworzymy nową pozycję
                $appointmentsList[$date] = [
                    "date" => $dateToDisplay,
                    "dayOfWeek" => $dayOfWeek,
                    "list" => []
                ];
            }

            // Dodajemy termin do listy w odpowiedniej grupie daty
            $appointmentsList[$date]["list"][] = $appoitmentService->normalizeAppointmentEntity($appointment);
        }


        foreach ($appointmentsList as &$dateData) {
            if (isset($dateData['list'])) {
                usort($dateData['list'], function ($a, $b) {
                    $startHourA = $a['startHour'];
                    $startHourB = $b['startHour'];

                    if ($startHourA == $startHourB) {
                        return 0;
                    }

                    return ($startHourA < $startHourB) ? -1 : 1;
                });
            }
        }


        ksort($appointmentsList);

        return new JsonResponse([
            'status' => "OK",
            'appoitmentsList' => $appointmentsList,
            'masterCategoriesList' => $masterCategoriesList,
            // 'individualPrice' => $individualPriceData,
            // 'crisisPrice' => $crisisPriceData
        ]);

    }



    /**
     * @Route("/api-fetch-calendar-appoitments", name="api_fetch-calendar-appoitments")
     */
    public function fetchCalendarAppointments(Request $request, UserService $userService)
    {
        $doctor = $this->getUser();
        if (!$userService->isDoctor()) {
            return new JsonResponse([
                'status' => "NOT",
                'message' => 'auth'
            ]);
        }

        // $doctor = $this->em->getRepository(User::class)->findByEmail('lekarz@test.pl');
        $appointments = $this->em->getRepository(AppointmentRule::class)->fetchByDoctor($doctor);

        $list = [];

        foreach ($appointments as &$appointment) {
            $date = $appointment->getStartDate()->format('Y-m-d');
            $list[$date][] = $appointment->getIsUsed() ? true : false;
        }

        $listKeys = [];
        foreach ($list as $keyDate => $itemArray) {
            $isValid = true;
            foreach ($itemArray as $item) {
                if ($item === false) {
                    $isValid = false;
                }
            }
            if ($isValid) {
                $listKeys[] = $keyDate;
            }
        }


        return new JsonResponse([
            'status' => "OK",
            'listOfKeys' => $listKeys
        ]);
    }



    /**
     * @Route("/api-fetch-appointments-for-valid-range", name="api_fetch-appointments-for-valid-range")
     */
    public function apiFetchAppointmentForRange(Request $request, AppoitmentService $appoitmentService, UserService $userService)
    {
        $doctor = $this->getUser();

        if (!$userService->isDoctor()) {
            return new JsonResponse([
                'status' => "NOT",
                'message' => 'auth'
            ]);
        }



        // $doctor = $this->em->getRepository(User::class)->findByEmail('lekarz@test.pl');
        $fromDate = $request->request->get('fromDate');
        $toDate = $request->request->get('toDate');
        // $fromDate = "2023/10/21";
        // $toDate = "2023/10/22";



        // $fromDateDateTime = new \DateTime($fromDate);
        // $toDateDateTime = new \DateTime($toDate);

        $appointmentsList = [];

        if ($fromDate === $toDate) {
            $appointments = $this->em->getRepository(AppointmentRule::class)->fetchByDoctorForSingleDate($doctor, $fromDate, $toDate);
        } else {
            $appointments = $this->em->getRepository(AppointmentRule::class)->fetchByDoctorForValidRange($doctor, $fromDate, $toDate);
        }




        foreach ($appointments as $appointment) {
            $date = $appointment->getStartDate();
            $time = (int) $date->format('H');
            if (!in_array($time, $appointmentsList)) {
                $appointmentsList[] = $time;
            }
        }

        // dd($appointmentsList);

        // $appointmentsListRanges = [];

        // foreach ($appointmentsList as $appointmentTime) {

        //     $finishTime = new \DateTime();
        //     $timeArray = explode(':', $appointmentTime);
        //     // dd($timeArray);
        //     $finishTime->setTime($timeArray[0], $timeArray[1]);

        //     $minutes_to_add = 60;
        //     $finishTime->add(new \DateInterval('PT' . $minutes_to_add . 'M'));
        //     $appointmentsListRanges[] = [intval($timeArray[0] . $timeArray[1]), intval($finishTime->format("Hi"))];
        // }


        return new JsonResponse([
            'status' => "OK",
            'appointments' => $appointmentsList
        ]);

    }

    /**
     * @Route("/api-fetch-appointments-for-valid-range-for-edit", name="api_fetch-appointments-for-valid-range-for-edit")
     */
    public function apiFetchAppointmentForRangeForEdit(Request $request, AppoitmentService $appoitmentService, UserService $userService)
    {
        $doctor = $this->getUser();

        if (!$userService->isDoctor()) {
            return new JsonResponse([
                'status' => "NOT",
                'message' => 'auth'
            ]);
        }

        // $doctor = $this->em->getRepository(User::class)->findByEmail('lekarz@test.pl');
        $fromDate = $request->request->get('fromDate');
        $toDate = $request->request->get('toDate');
        // $fromDate = "2023/10/21";
        // $toDate = "2024/01/21";

        // $fromDateDateTime = new \DateTime($fromDate);
        // $toDateDateTime = new \DateTime($toDate);

        $appointmentsList = [];


        $appointments = $this->em->getRepository(AppointmentRule::class)->fetchByDoctorForSingleDate($doctor, $fromDate, $toDate);

        // dd($appointments);


        foreach ($appointments as $appointment) {
            $date = $appointment->getStartDate();
            $dateKey = $appointment->getStartDate()->format("Y-m-d");
            $time = (int) $date->format('H');

            // $finishTime = new \DateTime();
            // $timeArray = explode(':', $time);
            // $finishTime->setTime($timeArray[0], $timeArray[1]);

            // $minutes_to_add = 60;
            // $finishTime->add(new \DateInterval('PT' . $minutes_to_add . 'M'));
            // $appointmentsListRanges[] = [intval($timeArray[0] . $timeArray[1]), intval($finishTime->format("Hi"))];

            if (!isset($appointmentsList[$dateKey])) {
                $appointmentsList[$dateKey] = [
                    "list" => []
                ];
            }

            $appointmentsList[$dateKey]["list"][] = (int) $time;


            //     $date = $appointment->getStartDate();
            //     $time = $date->format('H:i');
            //     if (!in_array($time, $appointmentsList)) {
            //         $appointmentsList[] = $time;
            //     }
        }

        // $appointmentsListRanges = [];

        // foreach ($appointmentsList as $appointmentTime) {

        // $finishTime = new \DateTime();
        // $timeArray = explode(':', $appointmentTime);
        // // dd($timeArray);
        // $finishTime->setTime($timeArray[0], $timeArray[1]);

        // $minutes_to_add = 60;
        // $finishTime->add(new \DateInterval('PT' . $minutes_to_add . 'M'));
        // $appointmentsListRanges[] = [intval($timeArray[0] . $timeArray[1]), intval($finishTime->format("Hi"))];
        // }

        // dd($appointmentsList);

        return new JsonResponse([
            'status' => "OK",
            'appointments' => $appointmentsList
        ]);

    }

    /**
     * @Route("/api-fetch-panel-specialist-save-prices", name="api_panel-specialist-save-prices")
     */

    public function apiSavePrices(Request $request, AppoitmentService $appoitmentService, UserService $userService)
    {
        $doctor = $this->getUser();

        if (!$userService->isDoctor()) {
            return new JsonResponse([
                'status' => "NOT",
                'message' => 'auth'
            ]);
        }
        $data = $request->request->get('data');
        // $data = '{"fromDate":"2023-10-21 18:11:41","toDate":"2023-10-22 18:11:41","currentMonth":10,"frequency":"norepeat","hourRules":[6]}';
        // $data = '{"13":{"price":13,"priceItem":4,"masterCategory":13},"14":{"price":13,"priceItem":5,"masterCategory":14}}';
        $data = json_decode($data, true);
        foreach ($data as $key => $value) {
            $priceItemId = $value['priceItem'];
            $price = $value['price'];
            $priceItem = $this->em->getRepository(PriceItem::class)->findOneBy(['id' => $priceItemId]);
            $price = $this->em->getRepository(Price::class)->findOneBy(['id' => $price]);
            $priceItem->setPrice($price);
            $this->em->persist($priceItem);
            $this->em->flush();

        }

        // $doctor = $this->em->getRepository(User::class)->findByEmail('lekarz@test.pl');
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

        // if ($priceIndividual && $priceCrisis) {
        //     $this->em->persist($doctor);
        //     $this->em->flush();
        // }



        return new JsonResponse([
            'status' => "OK",
            'id' => $data
        ]);

    }


    /**
     * @Route("/api-fetch-panel-specialist-prices-init-data", name="api_panel-specialist-prices")
     */

    public function apiFetchPrices(Request $request, AppoitmentService $appoitmentService, UserService $userService)
    {
        $doctor = $this->getUser();

        if (!$userService->isDoctor()) {
            return new JsonResponse([
                'status' => "NOT",
                'message' => 'auth'
            ]);
        }

        // $masterCategories = $this->em->getRepository(MasterCategory::class)->findBy(['isActive' => true]);

        $masterCategoriesList = [];
        foreach ($doctor->getMasterCategories() as $masterCategory) {
            $priceItem = $this->em->getRepository(PriceItem::class)->findOneByParams($doctor, $masterCategory);
            $masterCategoriesList[] = ['masterCategory' => $masterCategory->getId(), 'name' => $masterCategory->getName(), 'selectedPriceItem' => $priceItem->getId(), 'selectedPrice' => $priceItem->getPrice()->getId()];

        }


        // $doctor = $this->em->getRepository(User::class)->findByEmail('lekarz@test.pl');
        $prices = $this->em->getRepository(Price::class)->fetchActive();
        $pricesList = [];

        foreach ($prices as $price) {
            $pricesList[] = ["id" => $price->getId(), "valueForPatient" => $price->getValueForPatient(), "valueForDoctor" => $price->getValueForDoctor()];
        }

        $pricesSelected = [];
        // foreach ($doctor->getPrices() as $price) {
        //     $pricesSelected[$price->getType()][] = ["id" => $price->getId(), "valueForPatient" => $price->getValueForPatient(), "valueForDoctor" => $price->getValueForDoctor()];
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


        // dd($individualPrice, $individualPriceData);

        return new JsonResponse([
            'status' => "OK",
            'masterCategories' => $masterCategoriesList,
            'pricesList' => $pricesList,
            // 'individualPrice' => $individualPriceData,
            // 'crisisPrice' => $crisisPriceData,
        ]);

    }


    /**
     * @Route("/api-fetch-panel-specialist-appointment-by-month-year", name="api_appointment-fetch-by-month-year")
     */
    public function apiFetchAppointmentByMonth(Request $request, AppoitmentService $appoitmentService, UserService $userService)
    {

        $doctor = $this->getUser();
        if (!$userService->isDoctor()) {
            return new JsonResponse([
                'status' => "NOT",
                'message' => 'auth'
            ]);
        }
        // $doctor = $this->em->getRepository(User::class)->findByEmail('lekarz@test.pl');
        $month = $request->request->get('month');
        $year = $request->request->get('year');
        $month = '11';
        $year = '2023';
        $appointments = $this->em->getRepository(AppointmentRule::class)->fetchByDoctorWithYearAndMonthParams($doctor, $year, $month);

        $appointmentsList = [];
        // dd($appointments);
        foreach ($appointments as $appointment) {
            // dd($appointment->getAppointmentOrders());
            $appointmentOrder = null;
            if ($appointment->getAppointmentOrder()) {
                $order = $appointment->getAppointmentOrder();
                $patient = $order->getPatient();
                $appointmentOrder = [
                    'id' => $order->getId(),
                    'patientUsername' => $patient->getUsername(),
                    'patientEmail' => $patient->getEmail(),
                    'isDeleted' => $order->getIsDeleted()
                ];
            }


            $date = $appointment->getStartDate();
            $day = $appointment->getStartDate()->format('d');
            $time = $date->format('H:i');
            $startHour = (int) $date->format('H');
            $dayOfWeek = $date->format('N');
            $key = $day . "-" . $dayOfWeek;

            if (isset($appointmentsList[$key])) {
                // Jeśli istnieje, dodaj kolejny element do "list"
                $appointmentsList[$key]["list"][] = [
                    'id' => $appointment->getId(),
                    'startDate' => $appointment->getStartDate()->format("Y/m/d"),
                    'time' => $time,
                    'isUsed' => $appointment->getIsUsed(),
                    'order' => $appointmentOrder,
                    'startHour' => $startHour

                ];
            } else {
                // Jeśli nie istnieje, twórz nowy wpis
                // $appointmentsList[$key] = ["id" => $key, "list" => [["id" => $appointment->getId(), 'time' => $time]]];
                $appointmentsList[$key] = [
                    "range" => $key,
                    "list" => [
                        [
                            'id' => $appointment->getId(),
                            'startDate' => $appointment->getStartDate()->format("Y/m/d"),
                            'time' => $time,
                            'isUsed' => $appointment->getIsUsed(),
                            'order' => $appointmentOrder,
                            'startHour' => $startHour
                        ]
                    ]
                ];
            }

        }

        foreach ($appointmentsList as &$dateData) {
            if (isset($dateData['list'])) {
                usort($dateData['list'], function ($a, $b) {
                    $startHourA = $a['startHour'];
                    $startHourB = $b['startHour'];

                    if ($startHourA == $startHourB) {
                        return 0;
                    }

                    return ($startHourB < $startHourA) ? -1 : 1;
                });
            }
        }


        ksort($appointmentsList);


        return new JsonResponse([
            'status' => "OK",
            'appointments' => $appointmentsList
        ]);

    }

    /**
     * @Route("/api-fetch-panel-specialist-appointment-by-month-year-used", name="api_appointment-fetch-by-month-year-used")
     */
    public function apiFetchAppointmentByMonthUsed(Request $request, AppoitmentService $appoitmentService, UserService $userService)
    {
        $doctor = $this->getUser();

        if (!$userService->isDoctor()) {
            return new JsonResponse([
                'status' => "NOT",
                'message' => 'auth'
            ]);
        }
        $month = $request->request->get('month');
        $year = $request->request->get('year');
        $appointments = $this->em->getRepository(AppointmentRule::class)->fetchByDoctorWithYearAndMonthUsedParams($doctor, $year, $month);

        $appointmentsList = [];

        foreach ($appointments as $appointment) {

            $date = $appointment->getStartDate();
            $day = $appointment->getStartDate()->format('d');
            $time = $date->format('H:i');
            $dayOfWeek = $date->format('N');
            $key = $day . "-" . $dayOfWeek;

            $appointmentOrder = null;
            if ($appointment->getAppointmentOrder()) {
                $order = $appointment->getAppointmentOrder();
                $patient = $order->getPatient();
                $appointmentOrder = [
                    'id' => $order->getId(),
                    'patientUsername' => $patient->getUsername(),
                    'patientEmail' => $patient->getEmail(),
                    'isDeleted' => $order->getIsDeleted()
                ];
            }


            if (isset($appointmentsList[$key])) {
                // Jeśli istnieje, dodaj kolejny element do "list"
                $appointmentsList[$key]["list"][] = [
                    'id' => $appointment->getId(),
                    'startDate' => $appointment->getStartDate()->format("Y/m/d"),
                    'time' => $time,
                    'isUsed' => $appointment->getIsUsed(),
                    'order' => $appointmentOrder,
                ];
            } else {
                // Jeśli nie istnieje, twórz nowy wpis
                // $appointmentsList[$key] = ["id" => $key, "list" => [["id" => $appointment->getId(), 'time' => $time]]];
                $appointmentsList[$key] = [
                    "range" => $key,
                    "list" => [
                        [
                            'id' => $appointment->getId(),
                            'startDate' => $appointment->getStartDate()->format("Y/m/d"),
                            'time' => $time,
                            'isUsed' => $appointment->getIsUsed(),
                            'order' => $appointmentOrder,
                        ]
                    ]
                ];
            }

        }


        return new JsonResponse([
            'status' => "OK",
            'appointments' => $appointmentsList
        ]);

    }


    


    /**
     * @Route("/api-remove-appointment/{id}", name="api_remove-appointment")
     */
    public function removeAppointment(AppointmentRule $appointmentRule, Request $request, AppoitmentService $appoitmentService, UserService $userService)
    {

        if (!$userService->isDoctor()) {
            return new JsonResponse([
                'status' => "NOT",
                'message' => 'auth'
            ]);
        }

        // dd($appointmentRule,$appointmentRule->getIsUsed(),$appointmentRule->getIsUsed() === true);
        if ($appointmentRule != null) {
            $this->em->remove($appointmentRule);
            $this->em->flush();
            return new JsonResponse([
                'status' => "OK",
                // 'json' => $data
            ]);

        }


        return new JsonResponse([
            'status' => "",
            // 'json' => $data
        ]);

    }


    /**
     * @Route("/api-remove-order-appointment/{id}", name="api_remove-order-appointment")
     */
    public function removeAppointmentOrder(AppointmentOrder $appointmentOrder, Request $request, AppoitmentService $appoitmentService, UserService $userService,EmailService $emailService)
    {

        if (!$userService->isDoctor()) {
            return new JsonResponse([
                'status' => "NOT",
                'message' => 'auth'
            ]);
        }

        // dd($appointmentRule,$appointmentRule->getIsUsed(),$appointmentRule->getIsUsed() === true);
        if ($appointmentOrder != null) {
            $appointmentOrder->setIsDeleted(true);
            $this->em->persist($appointmentOrder);
            $this->em->flush();

            $emailService->sendRemoveAppointmentDoctor($appointmentOrder);
            $emailService->sendRemoveAppointmentPatient($appointmentOrder);

            return new JsonResponse([
                'status' => "OK",
                // 'json' => $data
            ]);

        }



        return new JsonResponse([
            'status' => "",
            // 'json' => $data
        ]);

    }


      /**
     * @Route("/api-remove-order-appointment-toogle/{id}", name="api_remove-order-appointment-toggle")
     */
    public function removeAppointmentOrderToggle(AppointmentOrder $appointmentOrder, Request $request, AppoitmentService $appoitmentService, UserService $userService,EmailService $emailService)
    {

        if ($appointmentOrder != null) {
            $appointmentOrder->setIsDeleted(false);
            $this->em->persist($appointmentOrder);
            $this->em->flush();


            return new JsonResponse([
                'status' => "OK",
                // 'json' => $data
            ]);

        }



        return new JsonResponse([
            'status' => "",
            // 'json' => $data
        ]);

    }



    /**
     * @Route("/api-remove-appointment-with-order/{id}", name="api_remove-order")
     */
    public function removeAppoitmentOrder(AppointmentRule $appointmentOrder, Request $request, AppoitmentService $appoitmentService, UserService $userService, EmailService $emailService)
    {

        if (!$userService->isDoctor()) {
            return new JsonResponse([
                'status' => "NOT",
                'message' => 'auth'
            ]);
        }


        if ($appointmentOrder) {
            $appointmentOrder->setIsDeleted(true);
            $this->em->persist($appointmentOrder);
            $this->em->flush();

            return new JsonResponse([
                'status' => "OK",
            ]);


        }


        return new JsonResponse([
            'status' => "NOT",
        ]);



    }


    /**
     * @Route("/api-update-appointment/{id}", name="api_update-appointment")
     */
    public function updateAppointment(AppointmentRule $appointmentRule, Request $request, AppoitmentService $appoitmentService, UserService $userService, EmailService $emailService)
    {

        if (!$userService->isDoctor()) {
            return new JsonResponse([
                'status' => "NOT",
                'message' => 'auth'
            ]);
        }

        $fromDate = $request->request->get('fromDate');
        $toDate = $request->request->get('toDate');
        $orderId = $request->request->get('orderId');
        // update appo /api-update-appointment/38 null 2023-10-24 2023-10-24
        // $fromDate = '2023-10-24 09:00';
        // $toDate = '2023-10-24 10:00';
        //    $orderId = '1'; 


        $fromDate = new \DateTime($fromDate);
        $toDate = new \DateTime($toDate);

        $appointmentRule->setStartDate($fromDate);
        $appointmentRule->setFinishDate($toDate);

        $startHour = (int) $fromDate->format('H');
        $appointmentRule->setStartHour($startHour);

        $finishHour = (int) $toDate->format('H');
        $appointmentRule->setFinishHour($finishHour);

        if ($orderId && $orderId !== "null") {
            $order = $this->em->getRepository(AppointmentOrder::class)->findOneBy(['id' => $orderId]);

            $order->setSelectedDate($fromDate);
            


            $this->em->persist($order);
            $this->em->flush($order);
            // dd($order);
            $emailService->sendChangeAppointmentPatient($order);
            $emailService->sendChangeAppointmentDoctor($order);

        }


        // dd($fromDate, $toDate, $orderId);

        $this->em->persist($appointmentRule);
        $this->em->flush();

        return new JsonResponse([
            'status' => "OK",
            '$fromDate' => $fromDate,
            '$toDate' => $toDate,
            "order" => $orderId
        ]);

    }



    /**
     * @Route("/api-create-appointment", name="api_create-appointment")
     */
    public function createAppointment(Request $request, AppoitmentService $appoitmentService, UserService $userService)
    {
        $user = $this->getUser();

        // $user = $this->em->getRepository(User::class)->findByEmail('maciej.figlarz@aplicativ.com');
        // dd($user,$userService->isDoctor());
        // if (!$userService->isDoctor()) {
        //     return new JsonResponse([
        //         'status' => "NOT",
        //         'message' => 'auth'
        //     ]);
        // }


        // $fromDate = new \DateTime('2023-10-31');
        // $toDate = new \DateTime('2023-11-1');
        // $end = $toDate;
        // $end->modify('+1 day');


        // $period = new \DatePeriod(
        //     $fromDate,
        //     new \DateInterval('P1D'),
        //     $end
        // );


        // $dateList = [];
        // foreach ($period as $key => $value) {
        //     if($value->format('m') === $toDate->format('m')){
        //         $dateList[] = $value->format('Y-m-d');
        //     }


        // }


        // dd($dateList,$period,$value->format('m'));





        // $user = $this->em->getRepository(User::class)->findByEmail('lekarz@test.pl');
        $data = $request->request->get('data');
        // $data = '{"fromDate":"2023-10-29 11:29:44","toDate":"2023-10-29 11:29:00","currentMonth":10,"frequency":"everyweek","hourRules":[6]}';

        $data = json_decode($data, true);
        //  dd($data);

        $fromDate = new \DateTime($data['fromDate']);
        $toDate = new \DateTime($data['toDate']);
        $frequency = $data['frequency'];
        // $frequency = "everyweek";
        $hourRules = $data['hourRules'];
        $currentMonth = $data['currentMonth'];

        $interval = $fromDate->diff($toDate);
        $type = "";

        // // dd($interval->days);

        // // dd($fromDate);

        $appointmentsList = [];

        $dateList = [];


        
        if ($frequency === "norepeat") {


            if ($fromDate->format('Y-m-d') === $toDate->format('Y-m-d')) {
                $fromDateFormat = $fromDate->format('Y-m-d');
                $type = "norepeat single";
                foreach ($hourRules as $hour) {
                    // dd($hour);
                    // $hourArray = explode(":", $hour);

                    $startDateTime = new \DateTime($fromDateFormat);
                    $startDateTime->setTime($hour, 0, 0);


                    $endDateTime = new \DateTime($fromDateFormat);
                    $endDateTime->setTime($hour, 0, 0);
                    $endDateTime->add(new \DateInterval('PT' . 60 . 'M'));


                    $appoitment = new AppointmentRule();

                    $appoitment->setStartDate($startDateTime);
                    $appoitment->setFinishDate($endDateTime);
                    $appoitment->setDoctor($user);

                    $startHour = (int) $startDateTime->format('H');
                    $appoitment->setStartHour($startHour);

                    $finishHour = (int) $toDate->format('H');
                    $appoitment->setFinishHour($finishHour);


                    $this->em->persist($appoitment);
                    $this->em->flush();
                    if ((int) $startDateTime->format('m') === $currentMonth) {
                        $appointmentsList = $appoitmentService->normalizeAppointmentEntityWithKeys($appoitment, $appointmentsList);
                    }

                    // dd($appointmentsList);
                }
            } else {
                $type = "norepeat multi";
                $end = $toDate;
                $end->modify('+1 day');

                $period = new \DatePeriod(
                    $fromDate,
                    new \DateInterval('P1D'),
                    $end
                );


                $dateList = [];
                foreach ($period as $key => $value) {
                    // dd($value,(int)$value->format('m') , $currentMonth);
                    // if ((int) $value->format('m') === $currentMonth) {
                    $dateList[] = $value->format('Y-m-d');
                    // }
                }

                $type = $dateList;

                // dd($dateList);

                foreach ($dateList as $date) {
                    $fromDateFormat = $date;
                    foreach ($hourRules as $hour) {

                        $startDateTime = new \DateTime($fromDateFormat);
                        $startDateTime->setTime($hour, 0, 0);

                        $endDateTime = new \DateTime($fromDateFormat);
                        $endDateTime->setTime($hour, 0, 0);
                        $endDateTime->add(new \DateInterval('PT' . 60 . 'M'));

                        $appoitment = new AppointmentRule();

                        $appoitment->setStartDate($startDateTime);
                        $appoitment->setFinishDate($endDateTime);
                        $appoitment->setDoctor($user);

                        $startHour = (int) $startDateTime->format('H');
                        $appoitment->setStartHour($startHour);

                        $finishHour = (int) $toDate->format('H');
                        $appoitment->setFinishHour($finishHour);


                        $this->em->persist($appoitment);
                        $this->em->flush();
                        if ((int) $startDateTime->format('m') === $currentMonth) {
                            $appointmentsList = $appoitmentService->normalizeAppointmentEntityWithKeys($appoitment, $appointmentsList);
                        }

                    }
                }

            }

        }


        if ($frequency === "everyweek") {
            // dd($interval->days, $fromDate->format('Y-m-d') === $toDate->format('Y-m-d'));
            if ($fromDate->format('Y-m-d') === $toDate->format('Y-m-d')) {
                $type = "everyweek single";
                $fromDateFormat = $fromDate->format('Y-m-d');

                $dayOfWeek = $fromDate->format("N");

                $endDate = new \DateTime();
                $endDate->add(new \DateInterval('P3M'));

                $dayOfWeekToFind = $fromDate->format("N"); // Change this to the desired day of the week

                $matchingDates = array();

                $clonedFromDate = new \DateTime($fromDate->format('Y-m-d'));

                while ($fromDate <= $endDate) {
                    if ($fromDate->format('N') == $dayOfWeekToFind) {
                        $matchingDates[] = $fromDate->format('Y-m-d');
                    }

                    $fromDate->add(new \DateInterval('P1D')); // Move to the next day
                }

                foreach ($matchingDates as $date) {
                    foreach ($hourRules as $hour) {

                        $startDateTime = new \DateTime($date);
                        $startDateTime->setTime($hour, 0, 0);

                        $endDateTime = new \DateTime($date);
                        $endDateTime->setTime($hour, 0, 0);
                        $endDateTime->add(new \DateInterval('PT' . 60 . 'M'));


                        $appoitment = new AppointmentRule();

                        $appoitment->setStartDate($startDateTime);
                        $appoitment->setFinishDate($endDateTime);
                        $appoitment->setDoctor($user);

                        $startHour = (int) $startDateTime->format('H');
                        $appoitment->setStartHour($startHour);

                        $finishHour = (int) $toDate->format('H');
                        $appoitment->setFinishHour($finishHour);

                        $this->em->persist($appoitment);
                        $this->em->flush();

                        if ((int) $startDateTime->format('m') === $currentMonth) {
                            $appointmentsList = $appoitmentService->normalizeAppointmentEntityWithKeys($appoitment, $appointmentsList);
                        }
                    }
                }

            } else {
                $type = "everyweek multiple";

                $endDate = new \DateTime();
                $endDate->add(new \DateInterval('P3M'));

                $end = $toDate;
                $end->modify('+1 day');

                $period = new \DatePeriod(
                    $fromDate,
                    new \DateInterval('P1D'),
                    $end
                );

                $daysOfWeekToFind = [];

                foreach ($period as $key => $value) {
                    // dd($value,(int)$value->format('m') , $currentMonth);
                    // if ((int) $value->format('m') === $currentMonth) {
                    $daysOfWeekToFind[] = $value->format('N');
                    // }
                }

                // dd($daysOfWeekToFind);

                $dayOfWeekToFind = $fromDate->format("N"); // Change this to the desired day of the week



                $matchingDates = array();

                $clonedFromDate = new \DateTime($fromDate->format('Y-m-d'));

                while ($clonedFromDate <= $endDate) {
                    if (in_array($clonedFromDate->format('N'), $daysOfWeekToFind)) {
                        // $matchingDates[] = $clonedFromDate->format('Y-m-d');
                        $matchingDates[] = $clonedFromDate->format('Y-m-d');
                    }

                    $clonedFromDate->add(new \DateInterval('P1D')); // Move to the next day
                }

                // dd("multi", $matchingDates,$daysOfWeekToFind);

                foreach ($matchingDates as $date) {
                    $fromDateFormat = $date;
                    foreach ($hourRules as $hour) {

                        $startDateTime = new \DateTime($fromDateFormat);
                        $startDateTime->setTime($hour, 0, 0);

                        $endDateTime = new \DateTime($fromDateFormat);
                        $endDateTime->setTime($hour, 0, 0);
                        $endDateTime->add(new \DateInterval('PT' . 60 . 'M'));

                        $appoitment = new AppointmentRule();

                        $appoitment->setStartDate($startDateTime);
                        $appoitment->setFinishDate($endDateTime);
                        $appoitment->setDoctor($user);

                        $startHour = (int) $startDateTime->format('H');
                        $appoitment->setStartHour($startHour);

                        $finishHour = (int) $toDate->format('H');
                        $appoitment->setFinishHour($finishHour);


                        $this->em->persist($appoitment);
                        $this->em->flush();

                        if ((int) $startDateTime->format('m') === $currentMonth) {
                            $appointmentsList = $appoitmentService->normalizeAppointmentEntityWithKeys($appoitment, $appointmentsList);
                        }

                    }
                }
            }


        }

        // dd($appointmentsList, $type, $dateList);

        return new JsonResponse([
            'status' => "OK",
            'apoitmentList' => $appointmentsList,
            'dateList' => $dateList,
            'frequency' => $frequency,
            'type' => $type
        ]);

    }




    /**
     * @Route("/api-update-doctor-settings", name="api_update-doctor-settings")
     */
    public function updateDoctorSettings(
        UserService $userService,
        Request $request
    ) {


        $user = $this->getUser();


        //                 foreach ($user->getMasterCategories() as $c) {
//    dd($c);



        //         }

        // $user = $this->em->getRepository(User::class)->findByEmail('lekarz@test.pl');


        // //master [7, 8]
        // $masterCategories = [7, 8];

        // $masterCategoriesEntities = $this->em->getRepository(MasterCategory::class)->findFromArray($masterCategories);
        // $single = $this->em->getRepository(MasterCategory::class)->findOneBy(['id'=> 9]);
        // if (!in_array($single->getId(), $masterCategories)) {
        //     $user->removeMasterCategory($single);
        //     $this->em->persist($user);
        // }

        // dd($masterCategoriesEntities,$single);
        // foreach ($masterCategoriesEntities as $c) {
        //     if (!in_array($c->getId(), $masterCategories)) {
        //         $user->removeMasterCategory($c);
        //         $this->em->persist($user);
        //     }


        // }

        // foreach ($masterCategoriesEntities as $c) {
        //     if (!$user->getMasterCategories()->contains($c)) {
        //         $user->addMasterCategory($c);
        //     }
        // }


        // dd($user);


        if (!$userService->isDoctor()) {
            return new JsonResponse([
                'status' => "NOT",
                'message' => 'auth'
            ]);
        }


        if ($user) {

            $username = $request->request->get('username');
            $email = $request->request->get('email');
            $phone = $request->request->get('phone');
            $gender = $request->request->get('gender');
            $about = $request->request->get('about');
            $workwith = $request->request->get('workwith');
            $education = $request->request->get('education');
            $experience = $request->request->get('experience');
            $categories = $request->request->get('categories');
            $langues = $request->request->get('langues');
            $categories = json_decode($categories, true);

            $masterCategories = $request->request->get('masterCategories');
            $masterCategories = json_decode($masterCategories, true);

            $user->setUsername($username);



            $currentEmail = $user->getEmail();
            if ($currentEmail !== $email) {
                $isExist = $this->em->getRepository(User::class)->findByEmail($email);
                if ($isExist) {
                    return new JsonResponse([
                        'status' => 'NOT',
                        'code' => 400,
                        'message' => "Wybrany email jest już zajęty."
                    ]);
                }
                $user->setEmail($email);
            }



            $user->setPhone($phone);
            $user->setGender($gender);
            $user->setAbout($about);
            $user->setWorkwith($workwith);
            $user->setEducation($education);
            $user->setExperience($experience);
            //categories

            $categoryEntities = $this->em->getRepository(DoctorCategory::class)->findFromArray($categories);

            foreach ($user->getDoctorCategories() as $c) {
                $user->removeDoctorCategory($c);
                $this->em->persist($user);
            }

            foreach ($categoryEntities as $c) {
                $user->addDoctorCategory($c);
            }


            //master [7, 8]
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


            //langues
            $languesArray = explode(",", $langues);
            $languesEntities = $this->em->getRepository(Langue::class)->findFromArray($languesArray);
            foreach ($user->getLangues() as $l) {
                $user->removeLangue($l);
                $this->em->persist($user);
            }

            foreach ($languesEntities as $l) {
                $user->addLangue($l);
            }



            $this->em->persist($user);
            $this->em->flush();

            // $loggedUser->setEmail();

            // $preparedCategories = [];
            // $categoriesArray = $this->em->getRepository(DoctorCategory::class)->findBy(['isActive' => true]);

            // foreach ($categoriesArray as $category) {
            //     $mainCategory = $category->getMainCategory()->getName();
            //     $preparedCategories[$mainCategory][] = ["id" => $category->getId(), "name" => $category->getName()];
            // }


            // $userData = [
            //     'username' => $loggedUser->getUsername(),
            //     'email' => $loggedUser->getEmail(),
            //     'phone' => $loggedUser->getPhone(),

            //     'about' => $loggedUser->getAbout(),
            //     'workwith' => $loggedUser->getWorkwith(),
            //     'education' => $loggedUser->getEducation(),
            //     'experience' => $loggedUser->getExperience(),
            // ];

            return new JsonResponse([
                'status' => "OK",
                'username' => $categoryEntities,
                'gender' => $gender,
                'langues' => $languesArray,
                'email' => "current" . $currentEmail . "email:" . $email,
                'masterCategories' => $masterCategories
            ]);

        }


        return new JsonResponse([
            'status' => "NOT",
        ]);

    }


    /**
     * @Route("/api-fetch-panel-specialist-data-settings", name="api_fetch-panel-specialist-data-settings")
     */
    public function fetchPanelSpecialistInitData(
        UserService $userService,
        Request $request
    ) {

        $loggedUser = $this->getUser();
        if (!$userService->isDoctor()) {
            return new JsonResponse([
                'status' => "NOT",
                'message' => 'auth'
            ]);
        }

        if ($loggedUser) {


            $preparedMasterCategories = [];
            $masterCategoriesArray = $this->em->getRepository(MasterCategory::class)->findBy(['isActive' => true]);

            foreach ($masterCategoriesArray as $category) {
                $preparedMasterCategories[] = ["id" => $category->getId(), "name" => $category->getName()];
            }


            $preparedSelectedMasterCategories = [];

            foreach ($loggedUser->getMasterCategories() as $category) {
                $preparedSelectedMasterCategories[] = ["id" => $category->getId(), "name" => $category->getName()];
            }





            $preparedCategories = [];
            $categoriesArray = $this->em->getRepository(DoctorCategory::class)->findBy(['isActive' => true]);

            foreach ($categoriesArray as $category) {
                $mainCategory = $category->getMainCategory()->getName();
                $preparedCategories[$mainCategory][] = ["id" => $category->getId(), "name" => $category->getName()];
            }


            $preparedSelectedCategories = ["service" => [], "specialization" => [], "problem" => [], "langue" => []];

            foreach ($loggedUser->getDoctorCategories() as $category) {
                $mainCategory = $category->getMainCategory()->getName();
                $preparedSelectedCategories[$mainCategory][] = ["id" => $category->getId(), "name" => $category->getName()];
            }


            $preparedSelectedLangues = [];

            foreach ($loggedUser->getLangues() as $langue) {
                if ($langue->getIsActive()) {
                    $preparedSelectedLangues[] = $langue->getId();
                }
            }

            $languesEntities = $this->em->getRepository(Langue::class)->findBy(['isActive' => true]);
            $languesList = [];

            foreach ($languesEntities as $langue) {
                $languesList[] = ["id" => $langue->getId(), "name" => $langue->getName()];
            }




            $userData = [
                'userID' => $loggedUser->getId(),
                'username' => $loggedUser->getUsername(),
                'email' => $loggedUser->getEmail(),
                'phone' => $loggedUser->getPhone(),
                'gender' => $loggedUser->getGender(),
                'avatar' => $loggedUser->getAvatarUrl(),

                'about' => $loggedUser->getAbout(),
                'workwith' => $loggedUser->getWorkwith(),
                'education' => $loggedUser->getEducation(),
                'experience' => $loggedUser->getExperience(),
                'categories' => $preparedSelectedCategories,
                'masterCategories' => $preparedSelectedMasterCategories,
                'langues' => $preparedSelectedLangues

            ];

            return new JsonResponse([
                'status' => "OK",
                'categories' => $preparedCategories,
                'langues' => $languesList,
                'userData' => $userData,
                'masterCategories' => $preparedMasterCategories
            ]);

        }


        return new JsonResponse([
            'status' => "NOT",
        ]);

    }


    /**
     * @Route("/api-doctor-upload-avatar/{user}",name="api-user-doctor-upload")
     */
    public function upload(User $user, Request $request, UserService $userService, FileService $fileService)
    {

        $file = $request->files->get('file');
        $fileToRemove = $request->request->get('fileToRemove');



        if ($file) {

            $newFileName = $fileService->generateUniqueFileName() . $user->getId() . "." . $fileService->getExtensionFromFileObject($file);
            if ($fileToRemove) {
                $fileService->removeFile('/upload/avatar/' . $fileToRemove, true);
            }



            $fileName = $fileService->uploadOryginalName($file, '/upload/avatar/', $newFileName);

            // $setting = $this->em->getRepository(Setting::class)->findOneBy(['name' => $type]);


            $user->setAvatar($fileName);
            $this->em->persist($user);


            $this->em->flush();
            return new JsonResponse([
                'status' => 'OK',
                'code' => 200,
                'message' => "Wszystko ok",
                'fileUrl' => "/upload/avatar/" . $fileName,
                'fileToRemove' => $fileToRemove,
                'userID' => $user->getId()
            ]);
        }

        return new JsonResponse([
            'status' => '',
            'code' => 400,
            'message' => "Cos poszło nie tak"
        ]);

        // return new JsonResponse(['status' => "OK", 'data' => $data]);
    }


}