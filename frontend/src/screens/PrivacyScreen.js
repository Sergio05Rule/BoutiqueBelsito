import React, { useEffect, useState } from "react";
import { Row, Col, Dropdown, Container } from "react-bootstrap/";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
export default function PrivacyScreen(props) {
  const classes = useStyles();

  //Render section of the components
  return (
    <Container>   
       <Row className="mt-5">
      <Col md={12}>
        <div id="par">
          <b>Informazioni Generali</b>
        </div>

        <div className="mt-3" id="par_min">
          Con la presente policy Boutique Belsito intende informare gli utenti
          visitatori del sito web “www.boutiquebelsito.it” della politica
          adottata in materia di Protezione dei dati personali, sottolineando il
          proprio impegno ed attenzione con riferimento alla tutela della
          privacy dei visitatori del Sito. La preghiamo di leggere attentamente
          la nostra Privacy Policy che si applica sia nel caso lei acceda al
          sito web e decida semplicemente di navigare al suo interno utilizzando
          i nostri servizi, senza acquistare alcun prodotto, sia nel caso decida
          di effettuare degli acquisti.<br></br>
          <br></br>La navigazione all’interno del Sito è libera e non richiede
          registrazione alcuna, con eccezione di alcune aree in cui l’utente può
          liberamente ed espressamente fornire una serie di dati che lo
          riguardano per accedere a servizi specificamente individuati (es. per
          poter procedere con gli acquisti, iscriversi alla newsletter o
          richiedere informazioni, ecc.). Laddove pertanto il visitatore intenda
          fornire i propri dati personali per accedere a tali ulteriori servizi,
          esso sarà espressamente informato ai sensi del D. Lgs. 30 giugno 2003,
          n. 196, “Codice in materia di protezione dei dati personali”, (il
          “Codice”) e del Regolamento UE 679/2016 “Regolamento generale sulla
          protezione dei dati” (il “Regolamento”) con indicazione (a titolo
          esemplificativo) delle finalità e modalità di utilizzo dei dati da
          parte di Boutique Belsito, nonché del diritto di richiedere in ogni
          momento la cancellazione dei dati o l’aggiornamento degli stessi. Ogni
          riferimento al Codice contenuto nella Privacy Policy, e nel Sito in
          generale, deve intendersi valido ed efficace nei limiti e nella misura
          in cui le norme richiamate resteranno in vigore successivamente
          all’entrata in vigore del Regolamento (25 maggio 2018).<br></br>
          <br></br>Ai sensi e per gli effetti del Codice e del Regolamento,
          Boutique Belsito fornisce le seguenti informazioni.{" "}
        </div>

        <hr></hr>

        <div className={classes.root}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              1. I TITOLARI E RESPONSABILI DEL TRATTAMENTO
            </AccordionSummary>
            <AccordionDetails>
              Il Titolare del trattamento dei dati personali è Boutique Belsito
              <br></br>
              <br></br>
              Per esigenze esclusivamente organizzative e funzionali, abbiamo
              nominato alcuni fornitori di servizi funzionali alla gestione del
              Sito quali responsabili esterni del trattamento dei dati personali
              degli utenti per finalità strettamente connesse e correlate alla
              prestazione dei servizi forniti dal Sito, compresa la vendita dei
              prodotti. Responsabile della protezione dei dati, ai sensi
              dell’art. 37 del Regolamento, è contattabile all’indirizzo e-mail
              boutiquebelsitoshop@gmail.it.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                2. TIPI DI DATI PERSONALI TRATTATI
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              Per accedere al Sito non è necessario procedere ad alcuna
              registrazione. Esistono tuttavia all’interno del Sito delle
              sezioni che richiedono una registrazione o l’utilizzo di username
              e password (ad es. per registrarsi all’area personale, o
              completare il processo di acquisto on-line), oppure dei servizi
              per il cui utilizzo è necessario fornire i propri dati (ad es. i
              suoi dati potranno essere richiesti per accedere ai servizi di
              newsletter, per contattarci, ecc.).<br></br>
              <br></br>Con riferimento ai dati relativi alla navigazione
              all’interno del Sito si veda anche il successivo punto 6
              riguardante gli Strumenti di profilazione utilizzati dal Sito.
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                3. FACOLTIVITA' DEL CONFERIMENTO DEI DATI PERSONALI
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              Il conferimento dei dati personali ha in linea generale natura
              facoltativa. Solo in determinati casi il mancato conferimento dei
              dati può comportare l’impossibilità di accedere a servizi
              specifici ed ottenere quanto eventualmente richiesto (ad es. la
              registrazione – ed il conferimento dei dati anagrafici,
              dell’indirizzo di posta elettronica, dell’indirizzo postale, dei
              dati della carta di credito/debito o coordinate bancarie e del
              numero di telefono – è necessario per procedere all’acquisto di
              prodotti on-line); il mancato conferimento di tali dati può quindi
              impedire a Boutique Belsito di consentire l’accesso ai servizi del
              Sito o di rispondere alle richieste degli utenti.<br></br>
              <br></br>I dati di volta in volta necessari sono indicati nei
              moduli di raccolta dati presenti nel Sito e le conseguenze del
              loro mancato conferimento sono riportate nelle specifiche
              informative presenti nelle pagine di raccolta dei dati.
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>4. FINALITA'</Typography>
            </AccordionSummary>
            <AccordionDetails>
              I dati sono raccolti e trattati per finalità strettamente connesse
              all’uso del Sito, dei suoi servizi e all’acquisto di prodotti
              on-line. Le finalità di utilizzo dei dati sono indicate in modo
              dettagliato nelle specifiche informative fornite dal Sito in tutti
              i casi di raccolta dei dati. Chiediamo quindi di voler leggere le
              informative che di volta in volta illustrano le caratteristiche
              dei trattamenti che saranno svolti da Boutique Belsito (es. per la
              registrazione al servizio di newsletter, per accedere all’area
              personale, ecc.). Il trattamento dei suoi dati avverrà nel pieno
              rispetto delle normative sulla Privacy.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                5. MODALITA', DURATA DEL TRATTAMENTO DEI DATI ED AMBITO DI
                COMUNICAZIONE
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
              I dati potranno essere trattati sia su supporto elettronico, che
              cartaceo (ad es. per la gestione degli acquisti sul Sito).
              Boutique Belsito garantisce il trattamento lecito e secondo
              correttezza dei dati personali forniti attraverso il Sito, nel
              pieno rispetto della normativa vigente, nonché la massima
              riservatezza dei dati forniti in sede di registrazione. Tutte le
              informazioni raccolte sono trasmesse in connessione protetta in
              modo da impedirne l’intercettazione da parte di estranei.{" "}
              <br></br>
              <br></br>I dati eventualmente forniti dagli utenti saranno
              trattati per i tempi previsti nelle specifiche informative fornite
              al momento della raccolta dei dati. <br></br>
              <br></br>Per quanto riguarda ai tempi di conservazione dei dati
              rilevati mediante l’utilizzo di strumenti di profilazione (es.
              cookies), si veda la nostra 
              <Link to="/CookiePolicy"> Cookie Policy</Link>. <br></br>
              <br></br>I dati non saranno comunicati o diffusi a terzi se non
              nei limiti ed alle condizioni espressamente indicate
              nell’informativa di volta in volta fornita all’utente e previa
              autorizzazione da parte dello stesso.
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                6. COLLEGAMENTI AD ALTRI SITI
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              La presente informativa è fornita solo per il sito
              www.boutiquebelsito.it e non anche per altri siti web
              eventualmente consultati dall’utente tramite link di collegamento.
              Boutique Belsito non può essere ritenuta responsabile dei dati
              personali forniti dagli utenti a soggetti esterni o a eventuali
              siti web collegati al presente Sito.{" "}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                7. STRUMENTI DI "PROFILAZIONE" E/O PERSONALIZZAZIONE
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
              Boutique Belsito non svolge alcuna attività di comunicazione
              promozionale e/o pubblicitaria senza il preventivo consenso
              espresso dell’utente.<br></br>
              <br></br>Il Sito utilizza “cookies”, sia tecnici (cioè per
              facilitare la navigazione e l’utilizzo del Sito), sia di
              profilazione (cioè per analizzare gli utenti ed i loro
              comportamenti e preferenze, e fargli avere pubblicità
              personalizzate). <br></br>
              <br></br>Per una spiegazione dettagliata sui cookies utilizzati
              dal Sito e come disattivarli ti invitiamo a leggere la nostra{" \n"}
              <Link to="/CookiePolicy">Cookie Policy</Link>.
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                8. LUOGO DI TRATTAMENTO DEI DATI
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              I trattamenti connessi ai servizi forniti dal Sito sono svolti
              presso la sede di Boutique Belsito e dalle società che forniscono
              servizi funzionali alla gestione del Sito, nominate quali
              responsabili esterni del trattamento. Un elenco completo dei
              responsabili esterni nominati da Boutique Belsito può essere
              richiesto ai contatti indicati al punto 9 della Privacy Policy.
              <br></br>
              <br></br>
              Per consentirci una corretta gestione del nostro Sito nonché
              l’adempimento delle obbligazioni contrattuali a nostro carico, i
              tuoi dati personali potranno essere oggetto di trasferimento verso
              Paesi non appartenenti all’Unione Europea, quali la Tunisia,
              U.S.A, Regno Unito e San Marino. <br></br>
              <br></br>Il trasferimento dei suoi dati avverrà nel pieno rispetto
              delle garanzie, delle misure e dei diritti previsti dalla
              normativa privacy.{" "}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                9. DIRITTI DEGLI INTERESSATI
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              Mediante comunicazione da inviarsi all’indirizzo e-mail
              boutiquebelsitoshop@gmail.com, lei potrà in ogni momento
              esercitare i diritti di cui agli artt. da 15 a 23 del Regolamento,
              tra cui conoscere quali dati stiamo trattando, con quali modalità
              e per quali finalità li utilizziamo, modificare i dati che ci ha
              fornito o cancellarli, chiederci di limitare l’uso dei suoi dati,
              richiedere di ricevere o trasmettere i suoi dati, ferma restando
              sempre la possibilità di cambiare i suoi consensi (eventualmente
              forniti). Può inoltre sempre opporsi al trattamento dei suoi dati
              effettuato, in particolare, per finalità di marketing o analisi
              delle sue preferenze.{" "}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                10. A CHI PUO` RIVOLGERSI PER PROPORRE UN RECLAMO
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              Le ricordiamo che, qualora non fosse soddisfatto delle risposte
              ricevute da Boutique Belsito (cfr. paragrafo 8) di cui sopra), lei
              potrà in ogni caso, qualora ritenga che il trattamento che La
              riguarda violi le disposizioni di cui al Regolamento, proporre
              reclamo all’autorità Garante per la protezione dei dati personali
              (www.garanteprivacy.it), oppure all’autorità Garante del Paese in
              cui risiede abitualmente, lavora oppure del luogo ove si è
              verificata la presunta violazione.{" "}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                11. LEGGE APPLICABILE
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              Questa Privacy Policy è regolata dal Regolamento UE 679/2016 e
              della normativa nazionale applicabile al caso di specie, nella
              misura in cui tale normativa resterà in vigore successivamente
              alla data di applicazione del Regolamento (25 maggio 2018).{" "}
              <br></br>
              <br></br>Il Regolamento garantisce che il trattamento dei dati
              personali si svolga nel rispetto dei diritti e delle libertà
              fondamentali, nonché della dignità dell’interessato, con
              particolare riferimento alla riservatezza, all’identità personale
              e al diritto alla protezione dei dati personali.{" "}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                12. CLAUSOLA DI REVISIONE
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              Boutique Belsito si riserva di rivedere, modificare o
              semplicemente aggiornare, in tutto o in parte, a propria esclusiva
              discrezione, in qualsiasi modo e/o in qualsiasi momento, senza
              preavviso, la presente Privacy Policy anche in considerazione di
              modifiche di norme di legge o di regolamento in materia di
              protezione dei dati personali. Le modifiche e gli aggiornamenti
              della Privacy Policy saranno notificati agli utenti mediante (i)
              invio di e-mail agli utenti registrati al Sito e (ii)
              pubblicazione nella Home Page del Sito, e saranno vincolanti non
              appena pubblicati e comunicati. Vi preghiamo pertanto di accedere
              con regolarità a questa sezione per verificare la pubblicazione
              della più recente ed aggiornata Privacy Policy o di controllare la
              vostra casella di posta elettronica.{" "}
            </AccordionDetails>
          </Accordion>
          <div className="mt-3" id="par">
            <b>
              Il testo integrale del Regolamento UE 679/2016 è consultabile sul
              sito del Garante per la Protezione dei dati personali
              www.garanteprivacy.it.{" "}
            </b>
          </div>
        </div>
      </Col>
    </Row>
    </Container>

  );
}
