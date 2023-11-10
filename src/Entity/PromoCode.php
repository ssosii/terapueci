<?php

namespace App\Entity;

use App\Repository\PromoCodeRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PromoCodeRepository::class)
 */
class PromoCode
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
    private $typeCode;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $expirationDate;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $rangeType;


    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $quota;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $percent;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $usedAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $createdAt;

       /**
     * @ORM\Column(type="boolean")
     */
    private $isActive = true;

       /**
     * @ORM\Column(type="boolean")
     */
    private $isUsed = false;

    /**
     * @ORM\OneToOne(targetEntity=AppointmentOrder::class, inversedBy="promoCode", cascade={"persist", "remove"})
     */
    private $appointmentOrder;
   




    public function getTypeCode(): ?string
    {
        return $this->typeCode;
    }

    public function setTypeCode(string $typeCode): self
    {
        $this->typeCode = $typeCode;

        return $this;
    }

    public function getExpirationDate(): ?\DateTimeInterface
    {
        return $this->expirationDate;
    }

    public function setExpirationDate(?\DateTimeInterface $expirationDate): self
    {
        $this->expirationDate = $expirationDate;

        return $this;
    }

    public function getRangeType(): ?string
    {
        return $this->rangeType;
    }

    public function setRangeType(string $rangeType): self
    {
        $this->rangeType = $rangeType;

        return $this;
    }



    public function getQuota(): ?string
    {
        return $this->quota;
    }

    public function setQuota(?string $quota): self
    {
        $this->quota = $quota;

        return $this;
    }

    public function getPercent(): ?string
    {
        return $this->percent;
    }

    public function setPercent(?string $percent): self
    {
        $this->percent = $percent;

        return $this;
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

    public function getUsedAt(): ?\DateTimeInterface
    {
        return $this->usedAt;
    }

    public function setUsedAt(?\DateTimeInterface $usedAt): self
    {
        $this->usedAt = $usedAt;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

  
    public function getId(): ?int
    {
        return $this->id;
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

    public function getIsUsed(): ?bool
    {
        return $this->isUsed;
    }

    public function setIsUsed(bool $isUsed): self
    {
        $this->isUsed = $isUsed;

        return $this;
    }

    public function getAppointmentOrder(): ?AppointmentOrder
    {
        return $this->appointmentOrder;
    }

    public function setAppointmentOrder(?AppointmentOrder $appointmentOrder): self
    {
        $this->appointmentOrder = $appointmentOrder;

        return $this;
    }

   
    

}
