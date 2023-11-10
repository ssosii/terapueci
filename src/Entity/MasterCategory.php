<?php

namespace App\Entity;

use App\Repository\MasterCategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=MasterCategoryRepository::class)
 */
class MasterCategory
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
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="masterCategories")
     */
    private $doctor;

        /**
     * @ORM\Column(type="boolean", nullable=false)
     */
    private $isActive = true;

    /**
     * @ORM\OneToMany(targetEntity=AppointmentOrder::class, mappedBy="masterCategory")
     */
    private $appoitmentOrder;

    /**
     * @ORM\OneToMany(targetEntity=PriceItem::class, mappedBy="masterCategory")
     */
    private $priceItems;


 

    public function __construct()
    {
        $this->doctor = new ArrayCollection();
        $this->priceItems = new ArrayCollection();
        $this->appoitmentOrder = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getDoctor(): Collection
    {
        return $this->doctor;
    }

    public function addDoctor(User $doctor): self
    {
        if (!$this->doctor->contains($doctor)) {
            $this->doctor[] = $doctor;
        }

        return $this;
    }

    public function removeDoctor(User $doctor): self
    {
        $this->doctor->removeElement($doctor);

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
     * @return Collection|AppointmentOrder[]
     */
    public function getAppoitmentOrder(): Collection
    {
        return $this->appoitmentOrder;
    }

    public function addAppoitmentOrder(AppointmentOrder $appoitmentOrder): self
    {
        if (!$this->appoitmentOrder->contains($appoitmentOrder)) {
            $this->appoitmentOrder[] = $appoitmentOrder;
            $appoitmentOrder->setMasterCategory($this);
        }

        return $this;
    }

    public function removeAppoitmentOrder(AppointmentOrder $appoitmentOrder): self
    {
        if ($this->appoitmentOrder->removeElement($appoitmentOrder)) {
            // set the owning side to null (unless already changed)
            if ($appoitmentOrder->getMasterCategory() === $this) {
                $appoitmentOrder->setMasterCategory(null);
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
            $priceItem->setMasterCategory($this);
        }

        return $this;
    }

    public function removePriceItem(PriceItem $priceItem): self
    {
        if ($this->priceItems->removeElement($priceItem)) {
            // set the owning side to null (unless already changed)
            if ($priceItem->getMasterCategory() === $this) {
                $priceItem->setMasterCategory(null);
            }
        }

        return $this;
    }

   


  
 
}
