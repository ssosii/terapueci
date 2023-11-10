<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

use App\Entity\Langue;
use Symfony\Component\HttpFoundation\JsonResponse;




class AdminLangueController extends BaseSiteController
{
    /**
     * @Route("/admin/jezyki", name="admin_langue")
     */
    public function index(EntityManagerInterface $em)
    {
        $langues = $em->getRepository(Langue::class)->findBy([],['id'=> 'desc']);
        return $this->render('admin/views/langue/list.html.twig', [
            'langues' => $langues,
        ]);
    }
    /**
     * @Route("/admin/jezyki/dodaj", name="admin_langue-create")
     */
    public function create(Request $request, EntityManagerInterface $em)
    {

        return $this->render('admin/views/langue/create.html.twig', []);
    }
    /**
     * @Route("/admin/langue-{langue}/edit", name="admin_langue-edit")
     */
    public function edit(Langue $langue, Request $request, EntityManagerInterface $em)
    {

        return $this->render('admin/views/langue/edit.html.twig', ['langue' => $langue]);
    }

    /**
     * @Route("/admin/api-langue-toggle-active/{id}",name="admin_api-langue-toggle")
     */
    public function categoryToggleActive(Langue $langue)
    {
        if ($langue) {
            $langue->setIsActive(!$langue->getIsActive());
            $this->em->persist($langue);
            $this->em->flush();
        }

        return new JsonResponse(['status' => "OK"]);
    }
   /**
     * @Route("/admin/update-langue/{langue}",name="admin_api-update-langue")
     */
    public function apiUpdate(Langue $langue, Request $request)
    {

        $name = $request->request->get('name');
        $langue->setName($name);
        $this->em->persist($langue);
        $this->em->flush();


        return new JsonResponse(['status' => "OK"]);
    }

     /**
     * @Route("/admin/api-create-langue",name="admin_api-create-langue")
     */
    public function apiCreate(Request $request)
    {

        $name = $request->request->get('name');
        $langue = new Langue();
        $langue->setName($name);
        $langue->setIsActive(true);
        $this->em->persist($langue);
        $this->em->flush();


        return new JsonResponse(['status' => "OK"]);
    }



    /**
     * @Route("/admin/langue-init-data-edit/{langue}",name="admin_api-init-data-langue")
     */
    public function apiInitData(Langue $langue, Request $request)
    {
        return new JsonResponse(['status' => "OK", 'name' => $langue->getName()]);
    }

}