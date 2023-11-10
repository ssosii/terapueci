<?php

namespace App\Controller;

use App\Entity\Cms;
use App\Entity\MasterCategory;
use App\Entity\ListWorkWithUs;
use App\Entity\ListCompany;

use App\Service\CmsService;
use Symfony\Component\Routing\Annotation\Route;



class CmsController extends BaseSiteController
{



    /**
     * @Route("/regulamin", name="statute")
     */
    public function statute(

    ) {

        $viewParameters = [
            // 'statute' => $this->em->getRepository(Cms::class)->findOneBy(['name' => 'statute'])
        ];
        return $this->render('frontend/views/pages/statute.html.twig', $viewParameters);

    }

    /**
     * @Route("/polityka-prywatnosci", name="policy")
     */
    public function policy(

    ) {
        $viewParameters = [
            // 'text' => $this->em->getRepository(Cms::class)->findOneBy(['name' => 'policy'])->getValue()
        ];
        return $this->render('frontend/views/pages/policy.html.twig', $viewParameters);
    }



    /**
     * @Route("/faq", name="faq")
     */
    public function faq()
    {


        $viewParameters = [
            // 'doctors' => $this->em->getRepository(User::class)->fetchByRoleActive('ROLE_DOCTOR'),
            // 'categories' => $this->em->getRepository(DoctorCategory::class)->findBy(['isActive' => true])
        ];
        return $this->render('frontend/views/pages/faq.html.twig', $viewParameters);
    }


    /**
     * @Route("/dla-firm", name="for-company")
     */
    public function forCompany(CmsService $cmsService)
    {

        $listEntities = $this->em->getRepository(ListCompany::class)->findAll();

        $list = [];
        foreach ($listEntities as $listEntity) {
            $list[] = ['id' => $listEntity->getId(), 'value' => $listEntity->getValue()];
        }


        $viewParameters = [
            'cms' => $cmsService->getForCompany(),
            'list' => $list
            // 'doctors' => $this->em->getRepository(User::class)->fetchByRoleActive('ROLE_DOCTOR'),
            // 'categories' => $this->em->getRepository(DoctorCategory::class)->findBy(['isActive' => true])
        ];
        return $this->render('frontend/views/pages/for-company.html.twig', $viewParameters);
    }
    /**
     * @Route("/pracuj-u-nas", name="pracuj-u-nas")
     */
    public function workWithUs(CmsService $cmsService)
    {


        $listEntities = $this->em->getRepository(ListWorkWithUs::class)->findAll();

        $list = [];
        foreach ($listEntities as $listEntity) {
            $list[] = ['id' => $listEntity->getId(), 'value' => $listEntity->getValue()];
        }


        // dd($cmsService->getWorkWithUs());
        $viewParameters = [
            'cms' => $cmsService->getWorkWithUs(),
            'list' => $list
        ];

        return $this->render('frontend/views/pages/work-with-us.html.twig', $viewParameters);
    }



    /**
     * @Route("/load-cms-homepage", name="cms-load1")
     */
    public function cmsLoadHomepage(

    ) {

         //Polityka
         $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "policy"]);

         if (!$item) {
             $page = new Cms();
 
             $page->setName('policy');
             $page->setValue('Policy. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).');
             $this->em->persist($page);
             $this->em->flush();
         }
         //STATUTE
         $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "statute"]);
         if (!$item) {
             $page = new Cms();
             $page->setName('statute');
             $page->setValue('Statute. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).');
             $this->em->persist($page);
             $this->em->flush();
         }
 

        //HERO
        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "sg_hero_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('sg_hero_title');
            $page->setValue('Wsparcie psychologiczne, na wyciągnięcie ręki');
            $this->em->persist($page);
            $this->em->flush();
        }

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "sg_hero_description"]);
        if (!$item) {
            $page = new Cms();
            $page->setName('sg_hero_description');
            $page->setValue('Witaj w centrum psychoterapii online W GŁOWIE SIĘ NIE MIEŚCI. Znajdziesz u nas wsparcie specjalistów zdrowia psychicznego, bez wychodzenia z domu.');
            $this->em->persist($page);
            $this->em->flush();
        }



        // DLACZEEGO WARTO


        //cat1
        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "sg_why_cat1_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('sg_why_cat1_title');
            $page->setValue('Zweryfikowani specjaliści');
            $this->em->persist($page);
            $this->em->flush();
        }

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "sg_why_cat1_description"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('sg_why_cat1_description');
            $page->setValue('Wszyscy terapeuci pracujący w naszym centrum online zostali dokładnie zweryfikowani i posiadają odpowiednie kwalifikacje.');
            $this->em->persist($page);
            $this->em->flush();
        }

        //cat2
        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "sg_why_cat2_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('sg_why_cat2_title');
            $page->setValue('Konsultacje 100% online');
            $this->em->persist($page);
            $this->em->flush();
        }

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "sg_why_cat2_description"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('sg_why_cat2_description');
            $page->setValue('Zapisujesz się i odbywasz konsultacje w 100% online. Bez wychodzenia z domu. Z dowolnego miejsca na świecie.');
            $this->em->persist($page);
            $this->em->flush();
        }


        //cat3
        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "sg_why_cat3_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('sg_why_cat3_title');
            $page->setValue('Elastyczne godziny');
            $this->em->persist($page);
            $this->em->flush();
        }

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "sg_why_cat3_description"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('sg_why_cat3_description');
            $page->setValue('Nasi specjaliści pracują 7 dni w tygodniu, od 6 do 22. Możesz z łatwością dopasować termin sesji do swojego kalendarza. Każda wizyta trwa 50 min.');
            $this->em->persist($page);
            $this->em->flush();
        }

        //cat4
        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "sg_why_cat4_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('sg_why_cat4_title');
            $page->setValue('Prosty proces zapisu na wizytę');
            $this->em->persist($page);
            $this->em->flush();
        }

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "sg_why_cat4_description"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('sg_why_cat4_description');
            $page->setValue('Nie musisz wypełniać długich formularzy. Znajdź specjalistę, wybierz termin sesji i spotkaj się online.');
            $this->em->persist($page);
            $this->em->flush();
        }

        //cat5
        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "sg_why_cat5_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('sg_why_cat5_title');
            $page->setValue('Łatwa dostępność');
            $this->em->persist($page);
            $this->em->flush();
        }

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "sg_why_cat5_description"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('sg_why_cat5_description');
            $page->setValue('Wystarczy Ci przeglądarka i dostęp do internetu. Nie musisz instalować żadnej aplikacji. Rozmowa odbędzie się online, w aplikacji Google Meet dostępnej w przeglądarce.');
            $this->em->persist($page);
            $this->em->flush();
        }

        //cat6
        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "sg_why_cat6_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('sg_why_cat6_title');
            $page->setValue('Transparentny cennik');
            $this->em->persist($page);
            $this->em->flush();
        }

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "sg_why_cat6_description"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('sg_why_cat6_description');
            $page->setValue('Nasi specjaliści oferują wizyty w jednej z 3 dostępnych cen: 140 zł, 180 zł i 220 zł. Masz wybór.');
            $this->em->persist($page);
            $this->em->flush();
        }



        //skutecnzosci
        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "sg_effect_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('sg_effect_title');
            $page->setValue('Skuteczność psychoterapii online jest potwierdzona badaniami naukowymi');
            $this->em->persist($page);
            $this->em->flush();
        }

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "sg_effect_description"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('sg_effect_description');
            $page->setValue('Badania naukowe potwierdzają, że psychoterapia online jest równie skuteczna, co tradycyjna terapia prowadzona w gabinecie. Pacjenci mają dostęp do pomocy psychologicznej w wygodnym i bezpiecznym środowisku, np. ze swojego domu. Psychoterapia online redukuje również bariery związane z dojazdem i zapewnia elastyczność czasową, co czyni ją atrakcyjną opcją dla wielu osób poszukujących wsparcia.');
            $this->em->persist($page);
            $this->em->flush();
        }


        // ***Company***
        //HERO
        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "company_hero_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('company_hero_title');
            $page->setValue('Oferta dla firm');
            $this->em->persist($page);
            $this->em->flush();
        }

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "company_hero_description"]);
        if (!$item) {
            $page = new Cms();
            $page->setName('company_hero_description');
            $page->setValue('t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using');
            $this->em->persist($page);
            $this->em->flush();
        }


        //offer

        //1
        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "company_offer1_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('company_offer1_title');
            $page->setValue('Tailored Sessions');
            $this->em->persist($page);
            $this->em->flush();
        }

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "company_offer1_description"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('company_offer1_description');
            $page->setValue('Your therapy sessions are customized to address your unique needs and goals.');
            $this->em->persist($page);
            $this->em->flush();
        }

        //2

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "company_offer2_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('company_offer2_title');
            $page->setValue('Tailored Sessions');
            $this->em->persist($page);
            $this->em->flush();
        }

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "company_offer2_description"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('company_offer2_description');
            $page->setValue('Your therapy sessions are customized to address your unique needs and goals.');
            $this->em->persist($page);
            $this->em->flush();
        }

        //3

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "company_offer3_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('company_offer3_title');
            $page->setValue('Tailored Sessions');
            $this->em->persist($page);
            $this->em->flush();
        }

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "company_offer3_description"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('company_offer3_description');
            $page->setValue('Your therapy sessions are customized to address your unique needs and goals.');
            $this->em->persist($page);
            $this->em->flush();
        }

        //  ***WORK WITH US***
        //HERO
        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "work_hero_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('work_hero_title');
            $page->setValue('Pracuj u nas');
            $this->em->persist($page);
            $this->em->flush();
        }

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "work_hero_description"]);
        if (!$item) {
            $page = new Cms();
            $page->setName('work_hero_description');
            $page->setValue('Dołącz do zespołu specjalistów W GŁOWIE SIĘ NIE MIEŚCI. Ty ustalasz swój grafik i decydujesz o wynagrodzeniu za sesję. My przyciągamy do Ciebie pacjentów i dajemy Ci platformę do promocji Twoich usług.');
            $this->em->persist($page);
            $this->em->flush();
        }


        //offer

        //1
        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "work_offer1_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('work_offer1_title');
            $page->setValue('Tailored Sessions');
            $this->em->persist($page);
            $this->em->flush();
        }

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "work_offer1_description"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('work_offer1_description');
            $page->setValue('Your therapy sessions are customized to address your unique needs and goals.');
            $this->em->persist($page);
            $this->em->flush();
        }

        //2

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "work_offer2_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('work_offer2_title');
            $page->setValue('Tailored Sessions');
            $this->em->persist($page);
            $this->em->flush();
        }

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "work_offer2_description"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('work_offer2_description');
            $page->setValue('Your therapy sessions are customized to address your unique needs and goals.');
            $this->em->persist($page);
            $this->em->flush();
        }


        //3

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "work_offer3_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('work_offer3_title');
            $page->setValue('Tailored Sessions');
            $this->em->persist($page);
            $this->em->flush();
        }

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "work_offer3_description"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('work_offer3_description');
            $page->setValue('Your therapy sessions are customized to address your unique needs and goals.');
            $this->em->persist($page);
            $this->em->flush();
        }


        //4

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "work_offer4_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('work_offer4_title');
            $page->setValue('Tailored Sessions');
            $this->em->persist($page);
            $this->em->flush();
        }

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "work_offer4_description"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('work_offer4_description');
            $page->setValue('Your therapy sessions are customized to address your unique needs and goals.');
            $this->em->persist($page);
            $this->em->flush();
        }


        //cennik 

        //1
        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "work_price1_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('work_price1_title');
            $page->setValue('Nazwa');
            $this->em->persist($page);
            $this->em->flush();
        }


        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "work_price1_description"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('work_price1_description');
            $page->setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
            $this->em->persist($page);
            $this->em->flush();
        }

        //2

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "work_price2_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('work_price2_title');
            $page->setValue('Nazwa');
            $this->em->persist($page);
            $this->em->flush();
        }


        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "work_price2_description"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('work_price2_description');
            $page->setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
            $this->em->persist($page);
            $this->em->flush();
        }

        //3

        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "work_price3_title"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('work_price3_title');
            $page->setValue('Nazwa');
            $this->em->persist($page);
            $this->em->flush();
        }


        $item = $this->getDoctrine()->getRepository(Cms::class)->findOneBy(['name' => "work_price3_description"]);

        if (!$item) {
            $page = new Cms();

            $page->setName('work_price3_description');
            $page->setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
            $this->em->persist($page);
            $this->em->flush();
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
            $masterCategory = $this->getDoctrine()->getRepository(MasterCategory::class)->findOneBy(['name' => $element]);
            if (!$masterCategory) {
                $masterCategory = new MasterCategory();
                $masterCategory->setName($element);
                $this->em->persist($masterCategory);
            }


        }
        $this->em->flush();




        $viewParameters = [];
        return $this->render('frontend/views/pages/statute.html.twig', $viewParameters);
    }







}