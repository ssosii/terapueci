<?php

namespace App\DataFixtures;


use App\Entity\DoctorCategory;
use App\Entity\MainCategory;
use App\Entity\MasterCategory;
use App\Entity\User;
use App\Entity\Langue;
use App\Entity\Price;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Doctrine\Persistence\ObjectManager;


class UserFixtures extends Fixture
{
    private $encoder;



    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }


    // public function prepareTreatment($user, $manager)
    // {


    //     $treatment = new Treatment();
    //     $targetArray = ['1.png', '2.png', '3.png', '4.png', '5.png'];

    //     $rewardArray = ['cup', 'medal'];

    //     for ($z = 1; $z <= 5; $z++) {

    //         $step = new TreatmentStep();
    //         $step->setTreatment($treatment);
    //         $step->setPosition(rand(1, 20));

    //         $target = new TreatmentTarget();
    //         $targetSingle = $targetArray[array_rand($targetArray, 1)];
    //         $target->setImage($targetSingle);
    //         $target->setName($targetSingle);
    //         $manager->persist($target);
    //         $step->setTreatmentTarget($target);

    //         $reward = new Reward();
    //         $reward->setImage($rewardArray[array_rand($rewardArray, 1)] . '.png');
    //         $manager->persist($reward);
    //         $step->setReward($reward);

    //         $manager->persist($step);

    //         $movies = ['1.mp4', '2.mp4', '3.mp4', '4.mp4', '5.mp4'];

    //         $recording = new Recording();
    //         $recording->setStep($step);
    //         $recording->setType('image');
    //         $recording->setFile('1.png');
    //         $recording->setPrefix('test');
    //         $recording->setCreatedOn(new \DateTime('now'));
    //         $recording->setIsActive(true);
    //         $manager->persist($recording);

    //         for ($i = 1; $i <= 5; $i++) {

    //             $recording = new Recording();
    //             $recording->setStep($step);
    //             $recording->setType('video');
    //             $recording->setPrefix('test');
    //             $recording->setFile($movies[array_rand($movies, 1)]);
    //             $recording->setCreatedOn(new \DateTime('now'));
    //             $recording->setIsActive(true);
    //             $manager->persist($recording);
    //         }
    //     }

    //     $treatment->setUser($user);
    //     $manager->persist($treatment);
    //     $manager->flush();
    // }

    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setUsername('Admin');
        $user->setSlug('admin');
        $user->setGender("woman");
        $user->setCreatedAt(new \DateTime('now'));
        $user->setEmail('admin@test.pl');



        // $unique = uniqid();
        // $password = $this->encoder->encodePassword($user, $unique);

        $password = $this->encoder->encodePassword($user, 'test');
        $user->setPassword($password);

        $user->setRoles(['ROLE_ADMIN']);

        $manager->persist($user);


        $user = new User();
        $user->setEmail('lekarz@test.pl');
        $user->setUsername('Doktor');
        $user->setSlug('lekarz');
        $user->setGender("woman");
        $password = $this->encoder->encodePassword($user, 'test');
        $user->setPassword($password);
        $user->setRoles(['ROLE_DOCTOR']);
        $manager->persist($user);


        $user = new User();
        $user->setEmail('pacjent@test.pl');
        $user->setUsername('Pacjent');
        $user->setSlug('pacjent');
        $user->setGender("woman");
        $password = $this->encoder->encodePassword($user, 'test');
        $user->setPassword($password);
        $user->setRoles(['ROLE_PATIENT']);
        $manager->persist($user);


        /////////////////////////////Categories


        // $service = new MainCategory();
        // $service->setName("service");
        // $manager->persist($service);
        // $manager->flush();

        $specialization = new MainCategory();
        $specialization->setName("specialization");
        $manager->persist($specialization);
        $manager->flush();

        $problem = new MainCategory();
        $problem->setName("problem");
        $manager->persist($problem);
        $manager->flush();

        $langue = new MainCategory();
        $langue->setName("langue");
        $manager->persist($langue);
        $manager->flush();



        $specializations = [
            "Poznawczo-bechawioralna",
            "Psychodynamiczna",
            "Humanistyczno-egzystencjalna",
            "Systemowa",
            "Integratywna",
            "Psychoanalityczna",
        ];

        $problems = [
            "Depresja",
            "Lęki",
            "Ataki paniki",
            "Kryzys psychiczny",
            "Zaburzenia osobowości",
            "ADHD / ADD",
            "DDA / DDD",
            "Spektrum autyzmu",
            "Wypalenie zawodowe",
            "Kryzys w związku"
        ];


        $langues = [
            "Polski",
            "Angielski",
            "Niemiecki",
            "Rosyjski",
            "Ukraiński",
            "Francuski",
            "Włoski",
            "Hiszpański",
        ];




        foreach ($specializations as $element) {

            $doctorCategory = new DoctorCategory();
            $doctorCategory->setMainCategory($specialization);
            $doctorCategory->setName($element);
            $manager->persist($doctorCategory);

        }
        $manager->flush();

        foreach ($problems as $element) {

            $doctorCategory = new DoctorCategory();
            $doctorCategory->setMainCategory($problem);
            $doctorCategory->setName($element);
            $manager->persist($doctorCategory);

        }

        foreach ($langues as $element) {

            $doctorCategory = new DoctorCategory();
            $doctorCategory->setMainCategory($langue);
            $doctorCategory->setName($element);
            $manager->persist($doctorCategory);

        }

        foreach ($langues as $langue) {

            $langueEn = new Langue();
            $langueEn->setName($langue);
            $langueEn->setIsActive(true);
            $manager->persist($langueEn);

        }



        $prices = [
            ["valueForPatient" => "140", "valueForDoctor" => "100"],
            ["valueForPatient" => "180", "valueForDoctor" => "140"],
            ["valueForPatient" => "220", "valueForDoctor" => "180"],
        ];


        foreach ($prices as $price) {

            $priceEn = new Price();
            $priceEn->setValueForDoctor($price["valueForDoctor"]);
            $priceEn->setValueForPatient($price["valueForPatient"]);
            $manager->persist($priceEn);

        }


        $services = [
            "Konsultacja psychologiczna",
            "Psychoterapia indywidualna",
            "Interwencja kryzysowa",
            "Psychoedukacja",
            "Coaching",
            "Mindfulness",
        ];


        foreach ($services as $element) {

            $masterCategory = new MasterCategory();
            $masterCategory->setName($element);
            $manager->persist($masterCategory);

        }
        $manager->flush();

        // $user = new User();
        // $user->setFirstName('Rafał');
        // $user->setSecondName('Pacjent');
        // $user->setSlug('pacjent1');
        // $user->setDescription('Now eldest new tastes plenty mother called misery get. Longer excuse for county nor except met its things.');

        // $user->setCreatedAt(new \DateTime('now'));
        // $user->setEmail('pacjent@wp.pl');

        // $unique = uniqid();
        // $password = $this->encoder->encodePassword($user, $unique);

        // $user->setPassword($password);

        // $user->setRoles(['ROLE_USER']);
        // $user->setTokenActivePassword($unique);

        // $manager->persist($user);


        // $this->prepareTreatment($user, $manager);


        // for ($i = 1; $i <= 10; $i++) {


        //     $user = new User();
        //     $user->setFirstName('Imię' . $i);
        //     $user->setSecondName('Nazwisko', $i);
        //     $user->setDescription('Now eldest new tastes plenty mother called misery get. Longer excuse for county nor except met its things.');
        //     $user->setSlug('test' . $i);

        //     $user->setCreatedAt(new \DateTime('now'));
        //     $user->setEmail('test' . $i . '@wp.pl');

        //     $unique = uniqid();
        //     $password = $this->encoder->encodePassword($user, $unique);
        //     $user->setTokenActivePassword($unique);
        //     $user->setPassword($password);

        //     $user->setRoles(['ROLE_USER']);

        //     $manager->persist($user);
        //     $this->prepareTreatment($user, $manager);
        // }

        $manager->flush();
    }
}