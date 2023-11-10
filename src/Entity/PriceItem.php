<?php

namespace App\Entity;

use App\Repository\PriceItemRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PriceItemRepository::class)
 */
class PriceItem
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="priceItems")
     */
    private $doctor;

   

    /**
     * @ORM\ManyToOne(targetEntity=Price::class, inversedBy="priceItems")
     */
    private $price;

    /**
     * @ORM\ManyToOne(targetEntity=MasterCategory::class, inversedBy="priceItems")
     */
    private $masterCategory;


    public function __construct()
    {
       
    }



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDoctor(): ?User
    {
        return $this->doctor;
    }

    public function setDoctor(?User $doctor): self
    {
        $this->doctor = $doctor;

        return $this;
    }


    public function getPrice(): ?Price
    {
        return $this->price;
    }

    public function setPrice(?Price $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getMasterCategory(): ?MasterCategory
    {
        return $this->masterCategory;
    }

    public function setMasterCategory(?MasterCategory $masterCategory): self
    {
        $this->masterCategory = $masterCategory;

        return $this;
    }

   
 
}
