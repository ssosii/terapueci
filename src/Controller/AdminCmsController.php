<?php

namespace App\Controller;

use App\Entity\Price;
use App\Entity\ListCompany;
use App\Entity\ListWorkWithUs;
use App\Service\CmsService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class AdminCmsController extends BaseSiteController
{
    /**
     * @Route("/admin/strona-glowna", name="admin_homepage")
     */
    public function index(): Response
    {

        return $this->render('admin/views/cms/homepage.html.twig', [
            'controller_name' => 'adminController',
        ]);
    }

    /**
     * @Route("/admin/cennik", name="admin_pricing")
     */
    public function pricing(): Response
    {


        $listEntities = $this->em->getRepository(Price::class)->findAll();
        // dd($listEntities);
        // dd($cmsService,$cmsService->getForCompany());

        return $this->render('admin/views/cms/pricing.html.twig', [
            'prices' => $listEntities

        ]);
    }


    /**
     * @Route("/admin/dla-firm", name="admin_for-company")
     */
    public function forCompany(CmsService $cmsService): Response
    {


        $listEntities = $this->em->getRepository(ListCompany::class)->findAll();

        $list = [];
        foreach ($listEntities as $listEntity) {
            $list[] = ['id' => $listEntity->getId(), 'value' => $listEntity->getValue()];
        }

        // dd($cmsService,$cmsService->getForCompany());

        return $this->render('admin/views/cms/for-company.html.twig', [
            'cms' => $cmsService->getForCompany(),
            'list' => $list,

        ]);
    }

    /**
     * @Route("/admin/pracuj-u-nas", name="admin_pracuj-z-nami")
     */
    public function pracujZnami(CmsService $cmsService): Response
    {


        $listEntities = $this->em->getRepository(ListWorkWithUs::class)->findAll();

        $list = [];
        foreach ($listEntities as $listEntity) {
            $list[] = ['id' => $listEntity->getId(), 'value' => $listEntity->getValue()];
        }


        return $this->render('admin/views/cms/work-with-us.html.twig', [
            'cms' => $cmsService->getWorkWithUs(),
            'list' => $list,

        ]);
    }

    // /admin/api-update-pricin


     /**
     * @Route("/admin/api-update-pricing/{price}", name="api-update-pricing")
     */
    public function apiUpdatePrice(Price $price, Request $request, CmsService $cmsService): Response
    {


        $valueForDoctor = $request->request->get('valueForDoctor');
        $valueForPatient = $request->request->get('valueForPatient');

        $price->setValueForDoctor($valueForDoctor);
        $price->setValueForPatient($valueForPatient);

        $this->em->persist($price);
        $this->em->flush();

        return new JsonResponse([
            'status' => "OK",
            'valueForDoctor' => $valueForDoctor,
        ]);

    }



    /**
     * @Route("/admin/api-fetch-pricing-init", name="api-fetch-pricing-init")
     */
    public function apifetchPrices(CmsService $cmsService): Response
    {

        $listEntities = $this->em->getRepository(Price::class)->findAll();
        // dd($listEntities);
        $list = [];
        foreach ($listEntities as $listEntity) {
            $list[] = ['id' => $listEntity->getId(), 'valueForDoctor' => $listEntity->getValueForDoctor(), 'valueForPatient' => $listEntity->getValueForPatient()];
        }

        return new JsonResponse([
            'status' => "OK",
            'list' => $list,
        ]);

    }


    /**
     * @Route("/admin/api-fetch-cms-for-company-init", name="api-fetch-cms-for-company-with-us")
     */
    public function apifetchCompany(CmsService $cmsService): Response
    {

        $listEntities = $this->em->getRepository(ListCompany::class)->findAll();

        $list = [];
        foreach ($listEntities as $listEntity) {
            $list[] = ['id' => $listEntity->getId(), 'value' => $listEntity->getValue()];
        }

        return new JsonResponse([
            'status' => "OK",
            'data' => $cmsService->getForCompany(),
            'list' => $list,
        ]);

    }

    /**
     * @Route("/admin/api-fetch-cms-work-with-us-init", name="api-fetch-cms-work-with-us")
     */
    public function apifetch(CmsService $cmsService): Response
    {

        $listEntities = $this->em->getRepository(ListWorkWithUs::class)->findAll();

        $list = [];
        foreach ($listEntities as $listEntity) {
            $list[] = ['id' => $listEntity->getId(), 'value' => $listEntity->getValue()];
        }

        return new JsonResponse([
            'status' => "OK",
            'data' => $cmsService->getWorkWithUs(),
            'list' => $list,
        ]);

    }




    /**
     * @Route("/admin/api-fetch-cms-homepage-init", name="api-fetch-cms-homepage")
     */
    public function apifetchcmshomepag(CmsService $cmsService): Response
    {


        return new JsonResponse([
            'status' => "OK",
            'data' => $cmsService->getHomepageData()
        ]);

    }



    /**
     * @Route("/admin/api-cms-update-company", name="api-cms-update-company")
     */
    public function apiupdateCompany(Request $request, CmsService $cmsService): Response
    {

        $data = $request->request->get('data');
        $data = json_decode($data, true);

        $list = $request->request->get('list');
        $list = json_decode($list, true);



        $cmsService->updateValue('company_hero_title', $data['company_hero_title']);
        $cmsService->updateValue('company_hero_description', $data['company_hero_description']);


        $cmsService->updateValue('company_offer1_title', $data['company_offer1_title']);
        $cmsService->updateValue('company_offer1_description', $data['company_offer1_description']);

        $cmsService->updateValue('company_offer2_title', $data['company_offer2_title']);
        $cmsService->updateValue('company_offer2_description', $data['company_offer2_description']);

        $cmsService->updateValue('company_offer3_title', $data['company_offer3_title']);
        $cmsService->updateValue('company_offer3_description', $data['company_offer3_description']);




        $oldList = $this->em->getRepository(ListCompany::class)->findAll();
        foreach ($oldList as $c) {
            $this->em->remove($c);

        }

        foreach ($list as $c) {
            $list = new ListCompany();
            $list->setValue($c['value']);
            $this->em->persist($list);
        }

        $this->em->flush();


        return new JsonResponse([
            'status' => "OK",
            'list' => $list

        ]);

    }





    /**
     * @Route("/admin/api-cms-update-work-with-us", name="api-cms-update-work-with-us")
     */
    public function apiupdateworkti(Request $request, CmsService $cmsService): Response
    {

        $data = $request->request->get('data');
        $data = json_decode($data, true);

        $list = $request->request->get('list');
        $list = json_decode($list, true);



        $cmsService->updateValue('work_hero_title', $data['work_hero_title']);
        $cmsService->updateValue('work_hero_description', $data['work_hero_description']);


        $cmsService->updateValue('work_offer1_title', $data['work_offer1_title']);
        $cmsService->updateValue('work_offer1_description', $data['work_offer1_description']);

        $cmsService->updateValue('work_offer2_title', $data['work_offer2_title']);
        $cmsService->updateValue('work_offer2_description', $data['work_offer2_description']);

        $cmsService->updateValue('work_offer3_title', $data['work_offer3_title']);
        $cmsService->updateValue('work_offer3_description', $data['work_offer3_description']);



        $cmsService->updateValue('work_price1_title', $data['work_price1_title']);
        $cmsService->updateValue('work_price1_description', $data['work_price1_description']);

        $cmsService->updateValue('work_price2_title', $data['work_price2_title']);
        $cmsService->updateValue('work_price2_description', $data['work_price2_description']);

        $cmsService->updateValue('work_price3_title', $data['work_price3_title']);
        $cmsService->updateValue('work_price3_description', $data['work_price3_description']);


        $oldList = $this->em->getRepository(ListWorkWithUs::class)->findAll();
        foreach ($oldList as $c) {
            $this->em->remove($c);

        }

        foreach ($list as $c) {
            $list = new ListWorkWithUs();
            $list->setValue($c['value']);
            $this->em->persist($list);
        }

        $this->em->flush();


        return new JsonResponse([
            'status' => "OK",
            'list' => $list

        ]);

    }



    /**
     * @Route("/admin/api-cms-update-homepage", name="api-fetch-cms-update")
     */
    public function apiupdatecmshomepag(Request $request, CmsService $cmsService): Response
    {

        $data = $request->request->get('data');
        $data = json_decode($data, true);

        $cmsService->updateValue('sg_hero_title', $data['sg_hero_title']);
        $cmsService->updateValue('sg_hero_description', $data['sg_hero_description']);


        $cmsService->updateValue('sg_why_cat1_title', $data['sg_why_cat1_title']);
        $cmsService->updateValue('sg_why_cat1_description', $data['sg_why_cat1_description']);

        $cmsService->updateValue('sg_why_cat2_title', $data['sg_why_cat2_title']);
        $cmsService->updateValue('sg_why_cat2_description', $data['sg_why_cat2_description']);

        $cmsService->updateValue('sg_why_cat3_title', $data['sg_why_cat3_title']);
        $cmsService->updateValue('sg_why_cat3_description', $data['sg_why_cat3_description']);

        $cmsService->updateValue('sg_why_cat4_title', $data['sg_why_cat4_title']);
        $cmsService->updateValue('sg_why_cat4_description', $data['sg_why_cat4_description']);

        $cmsService->updateValue('sg_why_cat5_title', $data['sg_why_cat5_title']);
        $cmsService->updateValue('sg_why_cat5_description', $data['sg_why_cat5_description']);

        $cmsService->updateValue('sg_why_cat6_title', $data['sg_why_cat6_title']);
        $cmsService->updateValue('sg_why_cat6_description', $data['sg_why_cat6_description']);


        $cmsService->updateValue('sg_why_cat6_title', $data['sg_effect_title']);
        $cmsService->updateValue('sg_why_cat6_description', $data['sg_why_cat6_description']);



        $cmsService->updateValue('sg_effect_title', $data['sg_effect_title']);
        $cmsService->updateValue('sg_effect_description', $data['sg_effect_description']);




        return new JsonResponse([
            'status' => "OK",
        ]);

    }





}
