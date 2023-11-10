<?php

namespace App\Entity;

use App\Repository\PriceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PriceRepository::class)
 */
class Price
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $valueForDoctor;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $valueForPatient;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isActive = true;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="individualPrice")
     */
    private $individualPrice;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="crisisPrice")
     */
    private $crisisPrice;

    /**
     * @ORM\OneToMany(targetEntity=PriceItem::class, mappedBy="price")
     */
    private $priceItems;


    public function __construct()
    {
        $this->individualPrice = new ArrayCollection();
        $this->crisisPrice = new ArrayCollection();
        $this->priceItems = new ArrayCollection();
  
    }


  



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getValueForDoctor(): ?string
    {
        return $this->valueForDoctor;
    }

    public function setValueForDoctor(string $valueForDoctor): self
    {
        $this->valueForDoctor = $valueForDoctor;

        return $this;
    }

    public function getValueForPatient(): ?string
    {
        return $this->valueForPatient;
    }

    public function setValueForPatient(string $valueForPatient): self
    {
        $this->valueForPatient = $valueForPatient;

        return $this;
    }


    public function getIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getIndividualPrice(): Collection
    {
        return $this->individualPrice;
    }

    public function addIndividualPrice(User $individualPrice): self
    {
        if (!$this->individualPrice->contains($individualPrice)) {
            $this->individualPrice[] = $individualPrice;
            $individualPrice->setIndividualPrice($this);
        }

        return $this;
    }

    public function removeIndividualPrice(User $individualPrice): self
    {
        if ($this->individualPrice->removeElement($individualPrice)) {
            // set the owning side to null (unless already changed)
            if ($individualPrice->getIndividualPrice() === $this) {
                $individualPrice->setIndividualPrice(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getCrisisPrice(): Collection
    {
        return $this->crisisPrice;
    }

    public function addCrisisPrice(User $crisisPrice): self
    {
        if (!$this->crisisPrice->contains($crisisPrice)) {
            $this->crisisPrice[] = $crisisPrice;
            $crisisPrice->setCrisisPrice($this);
        }

        return $this;
    }

    public function removeCrisisPrice(User $crisisPrice): self
    {
        if ($this->crisisPrice->removeElement($crisisPrice)) {
            // set the owning side to null (unless already changed)
            if ($crisisPrice->getCrisisPrice() === $this) {
                $crisisPrice->setCrisisPrice(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|PriceItem[]
     */
    public function getPriceItems(): Collection
    {
        return $this->priceItems;
    }

    public function addPriceItem(PriceItem $priceItem): self
    {
        if (!$this->priceItems->contains($priceItem)) {
            $this->priceItems[] = $priceItem;
            $priceItem->setPrice($this);
        }

        return $this;
    }

    public function removePriceItem(PriceItem $priceItem): self
    {
        if ($this->priceItems->removeElement($priceItem)) {
            // set the owning side to null (unless already changed)
            if ($priceItem->getPrice() === $this) {
                $priceItem->setPrice(null);
            }
        }

        return $this;
    }
   

}