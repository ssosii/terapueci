<?php

namespace App\Entity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;


/**
 * @ORM\Entity(repositoryClass="App\Repository\CodeRepository")
 */
class Code
{
    use TimestampableEntity;
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=555)
     */
    private $value;

      /**
     * @ORM\Column(type="string", length=555)
     */
    private $test;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="codes")
     */
    private $doctor;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isActive =true;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isUsed = false;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $selectedDate;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\AppointmentOrder", inversedBy="codes")
     */
    private $relationOrder;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): self
    {
        $this->value = $value;

        return $this;
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

    public function getSelectedDate(): ?\DateTimeInterface
    {
        return $this->selectedDate;
    }

    public function setSelectedDate(?\DateTimeInterface $selectedDate): self
    {
        $this->selectedDate = $selectedDate;

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

    public function getRelationOrder(): ?AppointmentOrder
    {
        return $this->relationOrder;
    }

    public function setRelationOrder(?AppointmentOrder $relationOrder): self
    {
        $this->relationOrder = $relationOrder;

        return $this;
    }

    public function getTest(): ?string
    {
        return $this->test;
    }

    public function setTest(string $test): self
    {
        $this->test = $test;

        return $this;
    }
}
