<?php

namespace App\Controller;

use App\Entity\PromoCode;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

use App\Entity\DoctorCategory;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Service\CodeService;
use App\Service\PaginatorService;


class AdminPromoCodeController extends BaseSiteController
{
    /**
     * @Route("/admin/kody-promocyjne/{page}", name="admin_promo")
     */
    public function index(EntityManagerInterface $em, PaginatorService $paginatorService, $page = 1)
    {

        $query = $em->getRepository(PromoCode::class)->queryFindAll();

        // $query = $this->em->getRepository(User::class)->queryFetchAll();



        $paginate = $paginatorService->paginate($query, $page, 50);
        return $this->render('admin/views/promo-code/list.html.twig', [
            'paginate' => $paginate
        ]);

    }
    /**
     * @Route("/admin/kody-promocyjne-dodaj", name="admin_promo-create")
     */
    public function create(Request $request, EntityManagerInterface $em, CodeService $codeService)
    {


        return $this->render('admin/views/promo-code/create.html.twig', []);
    }
    /**
     * @Route("/admin/kod-promocyjny-{promoCode}/edit", name="admin_promo-edit")
     */
    public function edit(PromoCode $promoCode, Request $request, EntityManagerInterface $em)
    {

        // if ($request->isMethod('post')) {
        //     $name = $request->request->get('name');
        //     $isActive = $request->request->get('isActive');
        //     $description = $request->request->get('description');
        //     if ($name && $doctorCategory) {
        //         $doctorCategory->setName($name);
        //         $doctorCategory->setIsActive($isActive == "on" ? true : false);
        //         $doctorCategory->setDescription($description);
        //         $em->persist($doctorCategory);
        //         $em->flush();
        //         $this->addFlash('success', 'Kategorię zmieniono poprawnie');
        //         return $this->redirect($this->generateUrl('admin_category'));
        //     }
        // }
        return $this->render('admin/views/category/edit.html.twig', ['category' => '']);
    }



    /**
     * @Route("/admin/api-promo-code/create",name="admin_api-promo-code-create")
     */
    public function createCode(Request $request)
    {
        // typeCode, expirationDate,  rangeType, number, quota, percent, name 

        $typeCode = $request->request->get('typeCode');
        $expirationDate = $request->request->get('expirationDate');
        $rangeType = $request->request->get('rangeType');
        $number = $request->request->get('number');
        $quota = $request->request->get('quota');
        $percent = $request->request->get('percent');
        $name = $request->request->get('name');


        $existName = $this->em->getRepository(PromoCode::class)->findBy(['name' => $name]);

        if (count($existName) > 0) {
            return new JsonResponse([
                'status' => "NOT",
                "message" => "",
            ]);

        }




        // $typeCode = "quota";
        // // $typeCode = "percent";
        // $number = "5";
        // $name = "name";

        // $quota = "100";
        // $percent = "50";

        // $rangeType = "termless";
        // $rangeType = "expiration";

        // $expirationDate = "2022-04-01";



        for ($i = 1; $i <= $number; $i++) {
            $promoCode = new PromoCode();
            $promoCode->setName($name);
            $promoCode->setTypeCode($typeCode);

            if ($typeCode === "quota") {
                $promoCode->setQuota($quota);
            }

            if ($typeCode === "percent") {
                $promoCode->setPercent($percent);
            }

            $promoCode->setRangeType($rangeType);

            if ($rangeType === "termless") {

            }

            if ($rangeType === "expiration") {
                $promoCode->setExpirationDate(new \DateTime($expirationDate));
            }

            $this->em->persist($promoCode);
            $this->em->flush();

        }






        // if ($promoCode) {
        //     // $promoCode->setIsActive(!$promoCode->getIsActive());
        //     $this->em->persist($promoCode);
        //     $this->em->flush();
        // }

        return new JsonResponse([
            'status' => "OK",
            "typeCode" => $request->request->get('typeCode'),
            "expirationDate" => $request->request->get('expirationDate'),
            "rangeType" => $request->request->get('number'),
            "quota" => $request->request->get('quota'),
            "percent" => $request->request->get('percent'),
            "name" => $request->request->get('name')
        ]);
    }


    /**
     * @Route("/admin/api-promo-code-toggle-active/{id}",name="admin_api-promo-code-toggle")
     */
    public function categoryToggleActive(PromoCode $promoCode)
    {
        if ($promoCode) {
            $promoCode->setIsActive(!$promoCode->getIsActive());
            $this->em->persist($promoCode);
            $this->em->flush();
        }

        return new JsonResponse(['status' => "OK"]);
    }
}