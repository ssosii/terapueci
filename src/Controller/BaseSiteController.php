<?php


namespace App\Controller;

use App\Entity\Logs;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class BaseSiteController extends AbstractController
{
    protected $em;
    protected $session;
    public $parameterBag;

    public function __construct(
        EntityManagerInterface $em,
        SessionInterface $session,
        RouterInterface $router,
        UrlGeneratorInterface $urlGenerator,
        ParameterBagInterface $parameterBag
    ) {
        $this->em = $em;
        $this->session = $session;
        $this->router = $router;
        $this->urlGenerator = $urlGenerator;
        $this->parameterBag = $parameterBag->get('public_directory');
    }
    public function getFileUrl()
    {
        return  $this->parameterBag;
    }
    public function getRepository(string $entityName)
    {
        return $this->em->getRepository($entityName);
    }
    public function removeEmptyItemFromArray(array $array)
    {
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $array[$key] = $this->removeEmptyItemFromArray($array[$key]);
            }

            if (empty($array[$key])) {
                unset($array[$key]);
            }
        }

        return $array;
    }

    public function createLog($url, $code, $msg)
    {
        $log = new Logs();
        $log->setUrl($url);
        $log->setCode($code);
        $log->setMsg($msg);


        $now = new \DateTime('now');
        $log->setCreatedAt($now);

        $this->em->persist($log);
        $this->em->flush();
    }

    /**
     * @param string $name
     * @param array $parameters
     * @return string
     */
    protected function routerGenerateAbsoluteUrl(
        string $name,
        array $parameters = []
    ) {
        return $this->router->generate($name, $parameters, UrlGeneratorInterface::ABSOLUTE_URL);
    }
    public function deserialize($data)
    {
        return $this->get('serializer')
            ->deserialize($data, Category::class, 'json');
    }


    public function saveEntityInDB($entity)
    {

        $this->em->persist($entity);
        $this->em->flush();
    }
}