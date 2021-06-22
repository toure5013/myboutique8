<?php
/**
 * @File
 * Contains namespace Drupal\rsvplist\Form\RSVPForm
 *
 */

 namespace Drupal\rsvplist\Form;
 use Drupal\Core\Database\Database;
 use Drupal\Core\Form\FormBase;
 use Drupal\Core\Form\FormStateInterface;

 class RSVPForm extends FormBase{

     /**
      * (@inheritdoc)
      */
    public function getFormId(){
        return 'rsvplist_email_form';
    }


    /**
      * (@inheritdoc)
      */
    public function buildForm(array $form,  FormStateInterface $form_state){
        $node = \Drupal::routeMatch()->getParameter('node');
        $nid = $node->nid->value;
        $form['email'] = array(
             '#title' => t('Email Adress'),
             '#type' => 'textfield',
             '#size' => 25,
             '#description' => t("We'll send updates to the email adress you prvide "),
             '#required' => TRUE,
        );


    // You can add many content has possible
    //     $form['test'] = array(
    //         '#title' => t('test'),
    //         '#type' => 'textfield',
    //         '#size' => 25,
    //         '#description' => t("test description"),
    //         '#required' => TRUE,
    //    );

        $form['submit'] = array(
            '#value' => t('RSVP'),
            '#type' => 'submit',
       );

       $form['nid'] = array(
        '#value' => $nid,
        '#type' => 'hidden',
        );

        return $form;
    }

    /**
    * (@inheritdoc)
    */
    public function validateForm(array &$form, FormStateInterface $form_state){
        $value = $form_state->getValue('email');
        if($value == !\Drupal::service('email.validator')->isvalid($value)){
            $form_state->setErrorByName('email', t('The Email adress %mail is invalid', array('%mail'=>$value )));
        }
    }
    
    /**
    * (@inheritdoc)
    */
    public function submitForm(array &$form, FormStateInterface $form_state){
          drupal_set_message(t('The form is working.'));
    }
      
 }