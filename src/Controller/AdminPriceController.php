<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

use App\Entity\Langue;
use Symfony\Component\HttpFoundation\JsonResponse;




class AdminPriceController extends BaseSiteController
{
    /**
     * @Route("/admin/jezyki", name="admin_langue")
     */
    public function index(EntityManagerInterface $em)
    {
        $langues = $em->getRepository(Langue::class)->findBy([],['id'=> 'desc']);
        // dd($langues);
        return $this->render('admin/views/langue/list.html.twig', [
            'langues' => $langues,
        ]);
    }
    // /**
    //  * @Route("/admin/jezyki/dodaj", name="admin_langue-create")
    //  */
    // public function create(Request $request, EntityManagerInterface $em)
    // {
    //     if ($request->isMethod('post')) {
    //         $name = $request->request->get('name');
    //         $description = $request->request->get('description');

    //         // if ($name) {
    //         //     $category = new DoctorCategory();
    //         //     $category->setName($name);
    //         //     $category->setDescription($description);
    //         //     $em->persist($category);
    //         //     $em->flush();
    //         //     $this->addFlash('success', 'Kategorię dodano poprawnie');
    //         //     return $this->redirect($this->generateUrl('admin_category'));
    //         // }
    //     }
    //     return $this->render('admin/views/langue/create.html.twig', []);
    // }
    // /**
    //  * @Route("/admin/langue-{langue}/edit", name="admin_langue-edit")
    //  */
    // public function edit(Langue $langue, Request $request, EntityManagerInterface $em)
    // {

    //     if ($request->isMethod('post')) {
    //         $name = $request->request->get('name');
    //         $isActive = $request->request->get('isActive');
    //         $description = $request->request->get('description');
    //         // if ($name && $doctorCategory) {
    //         //     $doctorCategory->setName($name);
    //         //     $doctorCategory->setIsActive($isActive == "on" ? true : false);
    //         //     $doctorCategory->setDescription($description);
    //         //     $em->persist($doctorCategory);
    //         //     $em->flush();
    //         //     $this->addFlash('success', 'Kategorię zmieniono poprawnie');
    //         //     return $this->redirect($this->generateUrl('admin_category'));
    //         // }
    //     }
    //     return $this->render('admin/views/langue/edit.html.twig', ['langue' => $langue]);
    // }

    // /**
    //  * @Route("/admin/api-langue-toggle-active/{id}",name="admin_api-langue-toggle")
    //  */
    // public function categoryToggleActive(Langue $langue)
    // {
    //     if ($langue) {
    //         $langue->setIsActive(!$langue->getIsActive());
    //         $this->em->persist($langue);
    //         $this->em->flush();
    //     }

    //     return new JsonResponse(['status' => "OK"]);
    // }
    // /**
    //  * @Route("/admin/api-create-langue",name="admin_api-create-langue")
    //  */
    // public function apiCreateCategory(Request $request)
    // {

    //     $name = $request->request->get('name');
    //     $langue = new Langue();
    //     $langue->setName($name);
    //     $langue->setIsActive(true);
    //     $this->em->persist($langue);
    //     $this->em->flush();


    //     return new JsonResponse(['status' => "OK"]);
    // }
}