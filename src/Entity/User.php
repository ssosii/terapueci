<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Gedmo\Mapping\Annotation as Gedmo;

// use Gedmo\Timestampable\Traits\TimestampableEntity;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface
{
    const FILES_AVATAR_LOCATION = "/upload/avatar/";
    // use TimestampableEntity;
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=150, unique=false)
     */
    private $username;

    /**
     * @Gedmo\Slug(fields={"firstName"})
     * @ORM\Column(length=90, unique=false,nullable=true)
     */
    private $slug;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $createdAt;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isBan = false;
    /**
     * @ORM\Column(type="boolean", nullable=false)
     */
    private $isDeleted = false;

    /**
     * @ORM\Column(type="boolean", nullable=false)
     */
    private $isActive = true;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $tokenChangeEmail;
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $changeEmail;

    /**
     * @ORM\Column(type="datetime",nullable=true)
     */
    private $tokenChangeEmailExpired;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isConfirmEmail = false;
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $tokenRegisterEmail;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $tokenChangePasswordExpired;
    /**
     * @ORM\Column(type="string", length=50,nullable=true)
     */
    private $tokenChangePassword;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $shortcut;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\AppointmentRule", mappedBy="doctor")
     */
    private $appointmentRules;


    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $phone = "";
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $gender = "";

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $about = "";

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $workwith = "";

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $education = "";

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $experience = "";

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\DoctorCategory", mappedBy="doctors")
     */
    private $doctorCategories;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $avatar;

    /**
     * @ORM\Column(type="boolean")
     */
    private $confirmPolicy = true;

    /**
     * @ORM\Column(type="boolean")
     */
    private $confirmStatute = true;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isHighlighted = false;

    /**
     * @ORM\Column(type="boolean")
     */
    private $confirmMarketing = false;

 

    /**
     * @ORM\ManyToOne(targetEntity=Price::class, inversedBy="individualPrice")
     */
    private $individualPrice;

    /**
     * @ORM\ManyToOne(targetEntity=Price::class, inversedBy="crisisPrice")
     */
    private $crisisPrice;

    /**
     * @ORM\ManyToMany(targetEntity=Langue::class, mappedBy="doctors")
     */
    private $langues;

    /**
     * @ORM\ManyToOne(targetEntity=Langue::class, inversedBy="patient")
     */
    private $patientLangue;

    /**
     * @ORM\Column(type="string", length=350,nullable=true)
     */
    private $googleID;

    /**
     * @ORM\Column(type="string", length=150,nullable=true)
     */
    private $facebookID;

    /**
     * @ORM\OneToMany(targetEntity=PriceItem::class, mappedBy="doctor")
     */
    private $priceItems;

    /**
     * @ORM\ManyToMany(targetEntity=MasterCategory::class, mappedBy="doctor")
     */
    private $masterCategories;

    /**
     * @ORM\OneToMany(targetEntity=AppointmentOrder::class, mappedBy="patient")
     */
    private $patientAppointmentOrders;

    /**
     * @ORM\OneToMany(targetEntity=AppointmentOrder::class, mappedBy="doctor")
     */
    private $doctorAppointmentsOrder;



    public function __construct()
    {
        $this->appointmentRules = new ArrayCollection();
        $this->doctorCategories = new ArrayCollection();

        $this->langues = new ArrayCollection();
        $this->priceItems = new ArrayCollection();
        $this->yes = new ArrayCollection();
        $this->masterCategories = new ArrayCollection();
        $this->patientAppointmentOrders = new ArrayCollection();
        $this->doctorAppointmentsOrder = new ArrayCollection();


    }


    public function getAvatarUrl()
    {
        $avatar = $this->getAvatar();
        if ($avatar) {
            return self::FILES_AVATAR_LOCATION . $this->getAvatar();
        }

        return '/functional/empty-avatar.png';
    }



    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }



    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

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



    public function getIsBan(): ?bool
    {
        return $this->isBan;
    }

    public function setIsBan(bool $isBan): self
    {
        $this->isBan = $isBan;

        return $this;
    }

    public function getIsDeleted(): ?bool
    {
        return $this->isDeleted;
    }

    public function setIsDeleted(bool $isDeleted): self
    {
        $this->isDeleted = $isDeleted;

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

    public function getTokenChangeEmail(): ?string
    {
        return $this->tokenChangeEmail;
    }

    public function setTokenChangeEmail(?string $tokenChangeEmail): self
    {
        $this->tokenChangeEmail = $tokenChangeEmail;

        return $this;
    }

    public function getChangeEmail(): ?string
    {
        return $this->changeEmail;
    }

    public function setChangeEmail(?string $changeEmail): self
    {
        $this->changeEmail = $changeEmail;

        return $this;
    }

    public function getTokenChangeEmailExpired(): ?\DateTimeInterface
    {
        return $this->tokenChangeEmailExpired;
    }

    public function setTokenChangeEmailExpired(?\DateTimeInterface $tokenChangeEmailExpired): self
    {
        $this->tokenChangeEmailExpired = $tokenChangeEmailExpired;

        return $this;
    }

    public function getIsConfirmEmail(): ?bool
    {
        return $this->isConfirmEmail;
    }

    public function setIsConfirmEmail(bool $isConfirmEmail): self
    {
        $this->isConfirmEmail = $isConfirmEmail;

        return $this;
    }

    public function getTokenRegisterEmail(): ?string
    {
        return $this->tokenRegisterEmail;
    }

    public function setTokenRegisterEmail(?string $tokenRegisterEmail): self
    {
        $this->tokenRegisterEmail = $tokenRegisterEmail;

        return $this;
    }

    public function getTokenChangePasswordExpired(): ?\DateTimeInterface
    {
        return $this->tokenChangePasswordExpired;
    }

    public function setTokenChangePasswordExpired(?\DateTimeInterface $tokenChangePasswordExpired): self
    {
        $this->tokenChangePasswordExpired = $tokenChangePasswordExpired;

        return $this;
    }

    public function getTokenChangePassword(): ?string
    {
        return $this->tokenChangePassword;
    }

    public function setTokenChangePassword(?string $tokenChangePassword): self
    {
        $this->tokenChangePassword = $tokenChangePassword;

        return $this;
    }

    public function getShortcut(): ?string
    {
        return $this->shortcut;
    }

    public function setShortcut(?string $shortcut): self
    {
        $this->shortcut = $shortcut;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }


    /**
     * @return Collection|AppointmentRule[]
     */
    public function getAppointmentRules(): Collection
    {
        return $this->appointmentRules;
    }

    public function addAppointmentRule(AppointmentRule $appointmentRule): self
    {
        if (!$this->appointmentRules->contains($appointmentRule)) {
            $this->appointmentRules[] = $appointmentRule;
            $appointmentRule->setDoctor($this);
        }

        return $this;
    }

    public function removeAppointmentRule(AppointmentRule $appointmentRule): self
    {
        if ($this->appointmentRules->removeElement($appointmentRule)) {
            // set the owning side to null (unless already changed)
            if ($appointmentRule->getDoctor() === $this) {
                $appointmentRule->setDoctor(null);
            }
        }

        return $this;
    }



    /**
     * @return Collection|DoctorCategory[]
     */
    public function getDoctorCategories(): Collection
    {
        return $this->doctorCategories;
    }

    public function addDoctorCategory(DoctorCategory $doctorCategory): self
    {
        if (!$this->doctorCategories->contains($doctorCategory)) {
            $this->doctorCategories[] = $doctorCategory;
            $doctorCategory->addDoctor($this);
        }

        return $this;
    }

    public function removeDoctorCategory(DoctorCategory $doctorCategory): self
    {
        if ($this->doctorCategories->removeElement($doctorCategory)) {
            $doctorCategory->removeDoctor($this);
        }

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(?string $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getAbout(): ?string
    {
        return $this->about;
    }

    public function setAbout(?string $about): self
    {
        $this->about = $about;

        return $this;
    }

    public function getWorkwith(): ?string
    {
        return $this->workwith;
    }

    public function setWorkwith(?string $workwith): self
    {
        $this->workwith = $workwith;

        return $this;
    }

    public function getEducation(): ?string
    {
        return $this->education;
    }

    public function setEducation(?string $education): self
    {
        $this->education = $education;

        return $this;
    }

    public function getExperience(): ?string
    {
        return $this->experience;
    }

    public function setExperience(?string $experience): self
    {
        $this->experience = $experience;

        return $this;
    }

    public function getGender(): ?string
    {
        return $this->gender;
    }

    public function setGender(?string $gender): self
    {
        $this->gender = $gender;

        return $this;
    }

    public function getConfirmPolicy(): ?bool
    {
        return $this->confirmPolicy;
    }

    public function setConfirmPolicy(bool $confirmPolicy): self
    {
        $this->confirmPolicy = $confirmPolicy;

        return $this;
    }

    public function getConfirmStatute(): ?bool
    {
        return $this->confirmStatute;
    }

    public function setConfirmStatute(bool $confirmStatute): self
    {
        $this->confirmStatute = $confirmStatute;

        return $this;
    }

    public function getConfirmMarketing(): ?bool
    {
        return $this->confirmMarketing;
    }

    public function setConfirmMarketing(bool $confirmMarketing): self
    {
        $this->confirmMarketing = $confirmMarketing;

        return $this;
    }


    public function getIndividualPrice(): ?Price
    {
        return $this->individualPrice;
    }

    public function setIndividualPrice(?Price $individualPrice): self
    {
        $this->individualPrice = $individualPrice;

        return $this;
    }

    public function getCrisisPrice(): ?Price
    {
        return $this->crisisPrice;
    }

    public function setCrisisPrice(?Price $crisisPrice): self
    {
        $this->crisisPrice = $crisisPrice;

        return $this;
    }

    /**
     * @return Collection|Langue[]
     */
    public function getLangues(): Collection
    {
        return $this->langues;
    }

    public function addLangue(Langue $langue): self
    {
        if (!$this->langues->contains($langue)) {
            $this->langues[] = $langue;
            $langue->addDoctor($this);
        }

        return $this;
    }

    public function removeLangue(Langue $langue): self
    {
        if ($this->langues->removeElement($langue)) {
            $langue->removeDoctor($this);
        }

        return $this;
    }

    public function getPatientLangue(): ?Langue
    {
        return $this->patientLangue;
    }

    public function setPatientLangue(?Langue $patientLangue): self
    {
        $this->patientLangue = $patientLangue;

        return $this;
    }

    public function getGoogleID(): ?string
    {
        return $this->googleID;
    }

    public function setGoogleID(?string $googleID): self
    {
        $this->googleID = $googleID;

        return $this;
    }

    public function getFacebookID(): ?string
    {
        return $this->facebookID;
    }

    public function setFacebookID(?string $facebookID): self
    {
        $this->facebookID = $facebookID;

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
            $priceItem->setDoctor($this);
        }

        return $this;
    }

    public function removePriceItem(PriceItem $priceItem): self
    {
        if ($this->priceItems->removeElement($priceItem)) {
            // set the owning side to null (unless already changed)
            if ($priceItem->getDoctor() === $this) {
                $priceItem->setDoctor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|MasterCategory[]
     */
    public function getMasterCategories(): Collection
    {
        return $this->masterCategories;
    }

    public function addMasterCategory(MasterCategory $masterCategory): self
    {
        if (!$this->masterCategories->contains($masterCategory)) {
            $this->masterCategories[] = $masterCategory;
            $masterCategory->addDoctor($this);
        }

        return $this;
    }

    public function removeMasterCategory(MasterCategory $masterCategory): self
    {
        if ($this->masterCategories->removeElement($masterCategory)) {
            $masterCategory->removeDoctor($this);
        }

        return $this;
    }

    public function getIsHighlighted(): ?bool
    {
        return $this->isHighlighted;
    }

    public function setIsHighlighted(bool $isHighlighted): self
    {
        $this->isHighlighted = $isHighlighted;

        return $this;
    }

    /**
     * @return Collection|AppointmentOrder[]
     */
    public function getPatientAppointmentOrders(): Collection
    {
        return $this->patientAppointmentOrders;
    }

    public function addPatientAppointmentOrder(AppointmentOrder $patientAppointmentOrder): self
    {
        if (!$this->patientAppointmentOrders->contains($patientAppointmentOrder)) {
            $this->patientAppointmentOrders[] = $patientAppointmentOrder;
            $patientAppointmentOrder->setPatient($this);
        }

        return $this;
    }

    public function removePatientAppointmentOrder(AppointmentOrder $patientAppointmentOrder): self
    {
        if ($this->patientAppointmentOrders->removeElement($patientAppointmentOrder)) {
            // set the owning side to null (unless already changed)
            if ($patientAppointmentOrder->getPatient() === $this) {
                $patientAppointmentOrder->setPatient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|AppointmentOrder[]
     */
    public function getDoctorAppointmentsOrder(): Collection
    {
        return $this->doctorAppointmentsOrder;
    }

    public function addDoctorAppointmentsOrder(AppointmentOrder $doctorAppointmentsOrder): self
    {
        if (!$this->doctorAppointmentsOrder->contains($doctorAppointmentsOrder)) {
            $this->doctorAppointmentsOrder[] = $doctorAppointmentsOrder;
            $doctorAppointmentsOrder->setDoctor($this);
        }

        return $this;
    }

    public function removeDoctorAppointmentsOrder(AppointmentOrder $doctorAppointmentsOrder): self
    {
        if ($this->doctorAppointmentsOrder->removeElement($doctorAppointmentsOrder)) {
            // set the owning side to null (unless already changed)
            if ($doctorAppointmentsOrder->getDoctor() === $this) {
                $doctorAppointmentsOrder->setDoctor(null);
            }
        }

        return $this;
    }



}