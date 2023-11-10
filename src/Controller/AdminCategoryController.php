<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

use App\Entity\DoctorCategory;
use App\Entity\MainCategory;
use Symfony\Component\HttpFoundation\JsonResponse;



class AdminCategoryController extends BaseSiteController
{
    /**
     * @Route("/admin/kategorie", name="admin_category")
     */
    public function index(EntityManagerInterface $em)
    {
        $categories = $em->getRepository(DoctorCategory::class)->findBy([], ['id' => 'DESC']);


        $preparedCategories = [];
        foreach ($categories as $category) {
            if ($category->getMainCategory()) {
                $mainCategoryName = $category->getMainCategory()->getName();
                if ($category->getMainCategory()->getName() !== "langue") {
                    $preparedCategories[$mainCategoryName][] = ["id" => $category->getId(), "name" => $category->getName(), "isActive" => $category->getIsActive()];
                }

            }
        }

        return $this->render('admin/views/category/list.html.twig', [
            'categoriesList' => $preparedCategories,
        ]);
    }
    /**
     * @Route("/admin/kategoria/dodaj/{type}", name="admin_category-create")
     */
    public function create($type, Request $request, EntityManagerInterface $em)
    {

        return $this->render('admin/views/category/create.html.twig', ['type' => $type]);
    }
    /**
     * @Route("/admin/kategoria-{doctorCategory}/edycja", name="admin_category-edit")
     */
    public function edit(DoctorCategory $doctorCategory, Request $request, EntityManagerInterface $em)
    {
        return $this->render('admin/views/category/edit.html.twig', ['category' => $doctorCategory]);
    }

    /**
     * @Route("/admin/api-category-toggle-active/{id}",name="admin_api-category-toggle")
     */
    public function categoryToggleActive(DoctorCategory $category)
    {
        if ($category) {
            $category->setIsActive(!$category->getIsActive());
            $this->em->persist($category);
            $this->em->flush();
        }

        return new JsonResponse(['status' => "OK"]);
    }

    /**
     * @Route("/admin/update-category/{category}",name="admin_api-update-category")
     */
    public function apiUpdate(DoctorCategory $category, Request $request)
    {

        $name = $request->request->get('name');
        $category->setName($name);
        $this->em->persist($category);
        $this->em->flush();


        return new JsonResponse(['status' => "OK"]);
    }

    /**
     * @Route("/admin/api-create-category",name="admin_api-create-category")
     */
    public function apiCreate(Request $request)
    {

        $name = $request->request->get('name');
        $type = $request->request->get('type');
        // $name = 'name';
        // $type = 'problem';
        $mainCategories = $this->em->getRepository(MainCategory::class)->findAll();


        $mainCategory = $this->em->getRepository(MainCategory::class)->findOneBy(["name" => $type]);

        $category = new DoctorCategory();
        $category->setName($name);
        $category->setType($type);
        $category->setMainCategory($mainCategory);
        $category->setIsActive(true);
        $this->em->persist($category);
        $this->em->flush();
        // dd( $mainCategories,$mainCategory );

        return new JsonResponse(['status' => "OK", "cat" => $category->getId() . $name . $type]);
    }



    /**
     * @Route("/admin/category-init-data-edit/{category}",name="admin_api-init-data")
     */
    public function apiInitData(DoctorCategory $category, Request $request)
    {
        return new JsonResponse(['status' => "OK", 'name' => $category->getName()]);
    }

}