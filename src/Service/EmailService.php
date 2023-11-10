<?php


namespace App\Service;

use App\Entity\GroupTravelOrder;
use App\Entity\ExcursionOrder;
use App\Entity\Customer;
use App\Entity\Setting;
use App\Entity\User;

use App\Helper\GroupTravelOrderHelper;

use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\EntityManagerInterface;
use Twig\Environment;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mime\Address;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\HttpKernel\KernelInterface;
use Twig\Loader\FilesystemLoader;


// public function sendEmail(MailerInterface $mailer): Response
//     {
//         $email = (new Email())
//             ->from('therapist@uwagauwaga.pl')
//             ->to('maciejfiglarz333@gmail.com')
//             //->cc('cc@example.com')
//             //->bcc('bcc@example.com')
//             //->replyTo('fabien@example.com')
//             //->priority(Email::PRIORITY_HIGH)
//             ->subject('Time for Symfony Mailer!')
//             ->text('Sending emails is fun again!')
//             ->html('<p>See Twig integration for better HTML integration!</p>');

//         $mailer->send($email);
//         return new JsonResponse([]);
//     }



class EmailService
{
    protected $template;
    protected $em;
    protected $mailer;

    public function __construct(
        EntityManagerInterface $em,
        // \Swift_Mailer $mailer,
        MailerInterface $mailer,
        Environment $template,
        KernelInterface $kernel

    ) {
        $this->em = $em;
        $this->emailFrom = 'kontakt@wglowiesieniemiesci.eu';
        $this->emailTo = 'kontakt@wglowiesieniemiesci.eu';
        // $this->emailTo = 'lukasz.sosnecki@gmail.com';

        $this->mailer = $mailer;
        $this->template = $template;
        $this->kernel = $kernel;
    }

    // public function sendRegisterUser($user)
    // {
    //     $emailTo = $user->getEmail();
    //     $params = ['user' => $user];
    //     $this->send('Nowe konto w aplikacji Rehawinners.pl', $emailTo, '_register-user', $params);
    // }


    public function testMail()
    {
        $emailTo = 'maciejfiglarz333@gmail.com';
        $emailRecipient = "testowy";
        $params = ['test' => '12'];
        $this->send('Test', $emailTo, $emailRecipient, '_test', $params);
    }

    // NEW
    public function sendNewAppointmentPatient($order)
    {
        $emailTo = $order->getPatient()->getEmail();
        $emailRecipient = $order->getPatient()->getUsername();
        $params = ['order' => $order];
        $this->send('Potwierdzenie zapisu na wizytę online', $emailTo, $emailRecipient, '_new-appointment-patient', $params);
    }

    public function sendNewAppointmentDoctor($order)
    {
        $emailTo = $order->getDoctor()->getEmail();
        $emailRecipient = $order->getDoctor()->getUsername();
        $params = ['order' => $order];
        $this->send('Nowa wizyta online', $emailTo, $emailRecipient, '_new-appointment-doctor', $params);
    }

    // CHANGE
    public function sendChangeAppointmentPatient($order)
    {
        $emailTo = $order->getPatient()->getEmail();
        $emailRecipient = $order->getPatient()->getUsername();
        $params = ['order' => $order];
        $this->send('Aktualizacja terminu wizyty online', $emailTo, $emailRecipient, '_change-appointment-patient', $params);
    }

    public function sendChangeAppointmentDoctor($order)
    {
        $emailTo = $order->getDoctor()->getEmail();
        $emailRecipient = $order->getDoctor()->getUsername();
        $params = ['order' => $order];
        $this->send('Aktualizacja terminu wizyty online', $emailTo, $emailRecipient, '_change-appointment-doctor', $params);
    }

    // REMIND
    public function sendRemindAppointmentPatient($order)
    {
        $emailTo = $order->getPatient()->getEmail();
        $emailRecipient = $order->getPatient()->getUsername();
        $params = ['order' => $order];
        $this->send('Przypomnienie o jutrzejszej wizycie online', $emailTo, $emailRecipient, '_remind-appointment-patient', $params);
    }

    public function sendRemindAppointmentDoctor($order)
    {
        $emailTo = $order->getDoctor()->getEmail();
        $emailRecipient = $order->getDoctor()->getUsername();
        $params = ['order' => $order];
        $this->send('Przypomnienie o jutrzejszej wizycie online', $emailTo, $emailRecipient, '_remind-appointment-doctor', $params);
    }


     // REMOVE
     public function sendRemoveAppointmentPatient($order)
     {
         $emailTo = $order->getPatient()->getEmail();
         $emailRecipient = $order->getPatient()->getUsername();
         $params = ['order' => $order];
         $this->send('Twoje spotkanie zostało odwołane', $emailTo, $emailRecipient, '_remove-order-patient', $params);
     }
 
     public function sendRemoveAppointmentDoctor($order)
     {
         $emailTo = $order->getDoctor()->getEmail();
         $emailRecipient = $order->getDoctor()->getUsername();
         $params = ['order' => $order];
         $this->send('Twoje spotkanie zostało odwołane', $emailTo, $emailRecipient, '_remove-order-doctor', $params);
     }
 



    public function sendPatientMessage($patient, $topic, $message)
    {
        $emailRecipient = $patient->getUsername();
        $params = ['message' => $message, 'topic' => $topic, 'patient' => $patient];
        $this->send('Wiadomość z panelu pacjenta od ' . $emailRecipient ,  $this->emailTo, 'system', '_message-from-patient-panel', $params);
    }


    public function sendContactForm($username, $topic, $email, $phone, $message)
    {

        $params = [
            'username' => $username,
            'topic' => $topic,
            'email' => $email,
            'phone' => $phone,
            'message' => $message
        ];

        $emailRecipient = 'Formularz kontaktowy';

        $this->send('Nowa wiadomość z formularza kontaktowego', $this->emailTo, $emailRecipient, '_contact-form', $params);

    }

    // public function contactFormMail($params)
    // {

    //     $this->send("Wiadomość z formularza kontaktowego", 'maciejfiglarz333@gmail.com', '_contact-form', $params);
    // }

    // public function sendRegisterEmail($user)
    // {
    //     $emailTo = $user->getEmail();
    //     $emailRecipient = $user->getUsername();
    //     $params = ['user' => $user];
    //     $this->send('Zapomniałem hasła', $emailTo, $emailRecipient, '_register-email', $params);
    // }

    public function sendRecoverPasswordLink($user)
    {
        //curent
        if ($user) {
            $emailTo = $user->getEmail();
            $emailRecipient = $user->getUsername();
            $params = ['user' => $user];
            $this->send('Zmiana hasła w sewisie W głowie się nie mieści', $emailTo, $emailRecipient, '_recover-password', $params);
        }
    }

    // public function sendChangeEmailMsg($user)
    // {

    //     $emailTo = $user->getEmail();
    //     $params = ['user' => $user];
    //     $this->send('Zmiana adresu email', $emailTo, '_change-email', $params);
    // }

    public function send(?string $title, ?string $emailTo, $emailRecipient, ?string $schemePartial, ?array $params)
    {


        // $url = $this->getSchemeUrl($schemePartial);

        $url = $this->kernel->getProjectDir() . '/templates/frontend/emails';

        // Create a Twig loader and environment
        // $loader = new FilesystemLoader($url); // Update the path to your Twig email templates directory
        // $twig = new Environment($loader);

        // dd($params);

        // Load the Twig template
        // $templatePath = $twig->load($this->getSchemeUrl($schemePartial));

        $templateContent = $this->template->render($this->getSchemeUrl($schemePartial), $params);

        // $transport = (new \Swift_SmtpTransport('smtp.dpoczta.pl', 587, 'tls'))
        //     ->setUsername('test@pianolekcje.pl') // Twój login do serwera SMTP
        //     ->setPassword('Getrich12#'); // Twoje hasło do serwera SMTP

        $transport = (new \Swift_SmtpTransport('motywacje.home.pl', 465, 'ssl'))
        ->setUsername('kontakt@wglowiesieniemiesci.eu') // Twój login do serwera SMTP
        ->setPassword('66ybv@UGXf@a'); // Twoje hasło do serwera SMTP

        // Utwórz mailer z danym transportem SMTP
        $mailer = new \Swift_Mailer($transport);

        // Utwórz nową wiadomość
        $message = (new \Swift_Message())
            ->setSubject($title) // Temat wiadomości
            ->setFrom(['kontakt@wglowiesieniemiesci.eu' => 'W głowie się nie mieści | centrum psychoterapii online']) // Adres nadawcy
            ->setTo([$emailTo => $emailRecipient]); // Adres odbiorcy


        // Treść wiadomości
        $message->setBody($templateContent, 'text/html');

        // Próbuj wysłać wiadomość
        try {
            $result = $mailer->send($message);
            // dd('Wiadomość została wysłana.');

            // Wartość $result zawiera ilość wysłanych wiadomości
            // Jeśli $result wynosi zero, to oznacza, że wiadomość nie została wysłana
        } catch (\Swift_TransportException $e) {
            // dd('Błąd w wysyłaniu wiadomości: ' . $e->getMessage());
        }


        //stara wersja

        // $url = $this->getSchemeUrl($schemePartial);

        // $email = (new TemplatedEmail())
        //     ->from('kontakt@rehawinners.pl')
        //     ->to(new Address($emailTo))
        //     ->subject($title)

        //     // path of the Twig template to render
        //     ->htmlTemplate($url)
        //     ->context($params);
        // $this->mailer->send($email);





    }

    public function getSchemeUrl(?string $name): string
    {
        // return $name . '.html.twig';
        return 'frontend/emails/' . $name . '.html.twig';
    }

    public function templateRender(string $name, array $context = array())
    {
        return $this->template->render($name, $context);
    }
}