<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AppointmentRuleRepository")
 */
class AppointmentRule
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="appointmentRules")
     */
    private $doctor;
    /**
     * @ORM\Column(type="boolean")
     */
    private $isActive = true;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $hours;

    /**
     * @ORM\Column(type="datetime",nullable=true)
     */
    private $startDate;

      /**
     * @ORM\Column(type="datetime",nullable=true)
     */
    private $finishDate;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isUsed = false;

    /**
     * @ORM\OneToOne(targetEntity=AppointmentOrder::class, mappedBy="appointmentRule", cascade={"persist"})
     */
    private $appointmentOrder;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $startHour;

    /**
     * @ORM\Column(type="integer")
     */
    private $finishHour;



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

    public function getHours(): ?string
    {
        return $this->hours;
    }

    public function setHours(?string $hours): self
    {
        $this->hours = $hours;

        return $this;
    }




    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(?\DateTimeInterface $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getFinishDate(): ?\DateTimeInterface
    {
        return $this->finishDate;
    }

    public function setFinishDate(?\DateTimeInterface $finishDate): self
    {
        $this->finishDate = $finishDate;

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

    public function getIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getAppointmentOrder(): ?AppointmentOrder
    {
        return $this->appointmentOrder;
    }

    public function setAppointmentOrder(?AppointmentOrder $appointmentOrder): self
    {
        // unset the owning side of the relation if necessary
        if ($appointmentOrder === null && $this->appointmentOrder !== null) {
            $this->appointmentOrder->setAppointmentRule(null);
        }

        // set the owning side of the relation if necessary
        if ($appointmentOrder !== null && $appointmentOrder->getAppointmentRule() !== $this) {
            $appointmentOrder->setAppointmentRule($this);
        }

        $this->appointmentOrder = $appointmentOrder;

        return $this;
    }

    public function getStartHour(): ?int
    {
        return $this->startHour;
    }

    public function setStartHour(?int $startHour): self
    {
        $this->startHour = $startHour;

        return $this;
    }

    public function getFinishHour(): ?int
    {
        return $this->finishHour;
    }

    public function setFinishHour(int $finishHour): self
    {
        $this->finishHour = $finishHour;

        return $this;
    }


}
