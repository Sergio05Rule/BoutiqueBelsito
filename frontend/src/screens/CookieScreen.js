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
export default function CookieScreen(props) {
  const classes = useStyles();

  //Render section of the components
  return (
    <Row className="mt-5">
      <Col md={12}>
        <div id="par">
          <b>Informazioni Generali</b>
        </div>
        <hr></hr>

        <div className={classes.root}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                1. CHE COS'E' UN COOKIE E A COSA SERVE
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                I cookie sono stati creati nel 1994 da Lou Montulli, un
                dipendente di Netscape, per risolvere dei problemi riguardanti
                le limitazioni nell’identificazione dei computer collegati a una
                pagina web. Senza i cookie i siti non possono sapere se due
                richieste provengono dallo stesso dispositivo, per questo è
                necessario assegnare loro delle etichette.<br></br>
                <br></br>I cookie vengono salvati nell’hard disk o nella memoria
                del computer del visitatore. Un cookie è un file di piccole
                dimensioni che viene inviato da un server web (che è il computer
                sul quale è in esecuzione il sito web visitato) al browser
                dell’utente (Internet Explorer, Mozilla Firefox, Google Chrome,
                ecc.) e salvato sul tuo dispositivo quando visiti un sito
                internet. I cookie permettono un funzionamento efficiente del
                sito e ne migliorano le prestazioni, danno anche informazioni
                per fini statistici o pubblicitari, principalmente per
                personalizzare l’esperienza di navigazione ricordando preferenze
                e modalità di navigazione. <br></br>
                <br></br>Il cookie è assimilabile ad una tessera identificativa
                esclusivamente personale, il cui compito è comunicare a Boutique
                Belsito quando torni. Molti siti web, compreso il sito
                www.boutiquebelsito.it (il “Sito”), se ne avvalgono. I cookie
                dicono con che frequenza visiti le pagine e questo aiuta a
                capire quali informazioni possano interessare ai visitatori. In
                questo modo, possiamo offrire più contenuti che interessano uno
                specifico comportamento e meno che non sono in linea con quanto
                potrebbe non interessare all’utente. I cookie aiutano ad essere
                più efficiente e a memorizzare preferenze e nomi utente,
                registrare prodotti e servizi e personalizzare pagine. <br></br>
                <br></br>I cookies non raccolgono informazioni direttamente
                identificative dell’utente. Infatti Boutique Belsito non può
                attraverso i cookies risalire a nessuna informazione personale
                direttamente identificativa (es. nome, cognome) se non fornita
                direttamente dall’utente. Inoltre, un altro sito web non può
                utilizzare un cookie rilasciato dal Sito per accedere ad altre
                informazioni contenute nel computer dell’utente. Una volta
                salvato nel computer, il cookie può essere letto solo dal sito
                web che lo ha creato (e quindi, nel nostro caso, da
                www.boutiquebelsito.it). In pratica, se non ci si iscrive al
                Sito e non si inseriscono informazioni personali, l’unica cosa
                che il server sa è che qualcuno con quel cookie è tornato a
                visitarci. Nient’altro. <br></br>
                <br></br>I cookies possono essere “di sessione” (quando vengono
                memorizzati esclusivamente per il tempo di durata della sessione
                di navigazione nel sito e sono cancellati con la chiusura del
                browser), oppure “permanenti” (vengono memorizzati per un tempo
                maggiore, fino allo loro scadenza o sino alla cancellazione da
                parte dell’utente).
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
                2. I COOKIE UTILIZZATI DAL SITO
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                Boutique Belsito utilizza diverse tipologie di cookie e
                tecnologie affini, ognuna delle quali ha una specifica funzione.
                <br></br>
                <br></br>Per ottimizzare l’utilizzo del sito e la completa
                funzionalità del processo di acquisto online e delle
                caratteristiche personalizzate, il computer, il tablet o il
                dispositivo mobile devono accettare i cookies. La nostra
                informativa sull’utilizzo dei cookies fornisce informazioni in
                merito alla tipologia di cookies utilizzati e alla modalità di
                gestione, controllo ed eliminazione. <br></br>
                <br></br>Vorremmo specificare che i cookies non danneggiano il
                tuo dispositivo. <br></br>
                <br></br>
                <i>Cookies di navigazione</i> <br></br>
                <br></br>Fin dal primo accesso questi cookies permettono al sito
                di funzionare correttamente e ti consentono di visualizzare i
                contenuti sul tuo dispositivo riconoscendo la lingua e il
                mercato del Paese dal quale hai scelto di connetterti. Se sei un
                utente registrato, permetteranno di riconoscerti e di accedere
                ai servizi offerti delle aree dedicate. I cookie di navigazione
                sono cookie tecnici e sono necessari al funzionamento del sito.
                Tali cookies sono solitamente temporanei, cd. “cookies di
                sessione”, e sono rilasciati dal Sito sul computer dell’utente
                durante la navigazione, ma vengono memorizzati esclusivamente
                per il tempo di durata della sessione di navigazione stessa. Ciò
                significa che quando l’utente chiude il suo browser i cookies
                vengono cancellati automaticamente e scompaiono, senza rimanere
                memorizzati sul computer. Sono formati da numeri casuali
                generati dal server e servono a consentire l’esplorazione sicura
                ed efficiente del Sito. <br></br>
                <br></br>
                <i>Cookies Funzionali</i> <br></br>
                <br></br>Questi cookie permettono, in base alla tua richiesta
                espressa, di facilitare la navigazione dell’utente all’interno
                del Sito , ad esempio riconoscendoti agli accessi successivi in
                modo da non dover inserire i tuoi dati a ogni visita (ad
                esempio: “Riconoscimi la prossima volta”, c.d. cookies per
                l’autenticazione). <br></br>
                <br></br>Se hai aggiunto articoli alla tua Shopping Bag e chiuso
                la sessione senza completare l’acquisto e senza eliminarli,
                questi cookie ti consentono di continuare lo shopping la volta
                successiva che accedi al sito (entro un periodo limitato)
                ritrovando gli articoli selezionati. <br></br>
                <br></br>I cookie funzionali non sono indispensabili al
                funzionamento del sito, ma migliorano la qualità e l’esperienza
                di navigazione. <br></br>
                <br></br>
                <i>Cookies Analitici Questi</i>
                <br></br>
                <br></br>
                cookie sono utilizzati per elaborare analisi statistiche sulle
                modalità di navigazione degli utenti sul nostro sito. <br></br>
                <br></br>Boutique Belsito tratta i risultati di queste analisi
                in maniera anonima ed esclusivamente per finalità statistiche
                solo se il fornitore di servizi utilizza i cookies in
                connessione al browser utilizzato o su altri dispositivi
                utilizzati per navigare sul sito. Il sito utilizza alcuni
                servizi di terzi che, in modo del tutto indipendente, installano
                cookies propri. <br></br>
                <br></br>
                <i>Cookies di marketing e profilazione</i> <br></br>
                <br></br>Questi cookie sono volti a creare profili relativi
                all’utente al fine di inviare messaggi commerciali che
                incontrano le preferenze manifestate durante la visita o per
                migliorare la tua esperienza di navigazione: mentre navighi il
                nostro sito questi cookie sono utili per mostrarti prodotti di
                tuo interesse o simili a quelli che hai visualizzato. Tali
                cookies sono rilasciati dal Sito sul computer dell’utente
                durante la navigazione e vengono memorizzati anche oltre per il
                tempo di durata della sessione di navigazione stessa, fino allo
                loro scadenza o sino alla cancellazione da parte dell’utente
                stesso (c.d. “cookies permanenti”). <br></br>
                <br></br>L’utilizzo di tali cookies richiede il consenso
                espresso ed informato dell’utente. <br></br>
                <br></br>
                <i>Cookies di Social Network</i> <br></br>
                <br></br>Questi cookie sono necessari per permettere al tuo
                account social di interagire con il nostro Sito. Servono ad
                esempio per farti esprimere il tuo apprezzamento e per
                condividerlo con i tuoi amici social. I cookies di social
                network non sono necessari alla navigazione.
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
                3. INFORMAZIONI DEI COOKIE RILASCIATI DA BOUTIQUE BELSITO
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                In merito ai cookies utilizzati nel Sito forniamo le seguenti
                informazioni:<br></br>
                <br></br>1) Il nome di dominio dal quale il server del Sito
                trasmette i cookies è: www.boutiquebelsito.it <br></br>
                <br></br>2) Finalità della raccolta: i cookies sono utilizzati
                ai fini di (i) consentire una navigazione più facile e veloce
                all’interno del Sito od effettuare analisi/verifiche statistiche
                ed anonime sull’utilizzo del sito (cookies tecnici); (ii)
                migliorare l’esperienza di navigazione, analizzando le
                preferenze degli utenti (ad es. le pagine visitate, i prodotti
                salvati nel carrello, ecc.) e ottimizzare la tua esperienza
                on-line suggerendo i prodotti e le promozioni migliori in base
                alla navigazione svolta (cookies di profilazione). <br></br>
                <br></br>3) Validità dei cookies: il Sito utilizza cookies di
                sessione (ovvero cookies che vengono automaticamente cancellati
                alla chiusura del browser), nonché cookies permanenti (ovvero
                cookies che sono conservati sino ad eventuale cancellazione da
                parte dell’utente), la cui durata non supera in ogni caso i 90
                giorni.
                <br></br>
                <br></br>4) Necessità di accettazione dei cookies:
                l’accettazione dei cookies non è obbligatoria; Ti ricordiamo
                tuttavia che disabilitare i cookies di navigazione o quelli
                funzionali può causare il malfunzionamento del sito e/o limitare
                il servizio che offriamo. <br></br>
                <br></br>5) Comunicazione dei dati: le informazioni raccolte
                tramite i cookies sono riservate e non sono comunicate a terzi.
              </div>
            </AccordionDetails>
          </Accordion>
          <div className="mt-3" id="par">
            <b>Cookies e diritti</b>
          </div>
          <hr></hr>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                4. COOKIE DI TERZE PARTI
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                Il Sito utilizza c.d. “cookies di terze parti” (es. Google
                Analytics e cookies di Social Network), ovvero cookies che sono
                rilasciati e gestiti da parte di soggetti diversi da Boutique
                Belsito. Questi cookies permettono di offrirti la nostra
                proposta commerciale su altri siti web affiliati (c.d.
                “retargeting”). Sui cookie di terza parte non abbiamo il
                controllo delle informazioni fornite dal cookies e non abbiamo
                accesso a tali dati. Queste informazioni sono controllate
                totalmente dalle società terze secondo quanto descritto nelle
                rispettive privacy policy.<br></br>
                <br></br>
                <li>
                  Facebook:{" "}
                  <a href="https://www.facebook.com/policies/cookies/">
                    https://www.facebook.com/policies/cookies/
                  </a>
                </li>
                <li>
                  Google Adwords:{" "}
                  <a href="https://policies.google.com/technologies/ads?hl=en">
                    https://policies.google.com/technologies/ads?hl=en
                  </a>
                </li>
                <li>
                  Google Analytics:{" "}
                  <a href="https://policies.google.com/privacy">
                    https://policies.google.com/privacy
                  </a>
                </li>
                <li>
                  Google Doubleclick:{" "}
                  <a href="https://privacy.google.com/businesses/processorterms/">
                    https://privacy.google.com/businesses/processorterms/
                  </a>
                </li>
                <li>
                  Instagram:{" "}
                  <a href="https://help.instagram.com/519522125107875">
                    https://help.instagram.com/519522125107875
                  </a>
                </li>
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
                5. DISATTIVAZIONE/CANCELLAZIONE DEI COOKIE TRAMITE WEB BROWSER
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                Cookies e diritti 4. COOKIE DI TERZE PARTI 5.
                DISATTIVAZIONE/CANCELLAZIONE DEI COOKIE TRAMITE WEB BROWSER È in
                ogni caso possibile disattivare/attivare o cancellare i cookies
                in ogni momento mediante utilizzo delle impostazioni del suo web
                browser. In particolare se si desidera non ricevere cookies, è
                possibile impostare il proprio browser in modo tale da essere
                avvertiti della presenza di un cookie potendo così decidere se
                accettarlo o meno; si possono anche rifiutare automaticamente
                tutti i cookies, attivando l’apposita opzione nel browser. E’
                anche possibile eliminare cookie specifici che sono già stati
                memorizzati all’interno del browser, o bloccare la
                memorizzazione di cookie sul vostro computer da parte di siti
                web specifici, oppure bloccare i cookie di terze parti.{" "}
                <br></br>
                <br></br>Ogni browser ha la sua tipologia di gestione dei
                cookie, nel pannello di amministrazione o di preferenze è
                possibile modificare/gestire i parametri e procedere alla
                cancellazione.
                <br></br>
                <br></br>Per disabilitare l’uso di tutti o solo di alcuni
                cookies è necessario modificare le impostazioni del browser di
                navigazione (Firefox, Chrome, Explorer, Safari, Opera, ecc.).{" "}
                <br></br>
                <br></br>Per farlo può consultare le informazioni riportate nel
                Manuale d’uso del browser (c.d. Help Page) oppure cliccare sui
                seguenti link:<br></br>
                <br></br>
                Internet Explorer:
                <a href="http://windows.microsoft.com/it-it/windows7/block-enable-or-allow-cookies">
                  http://windows.microsoft.com/it-it/windows7/block-enable-or-allow-cookies
                </a>
                <br></br>
                <br></br>
                Safari:{" "}
                <a href="http://support.apple.com/kb/PH11913">
                  http://support.apple.com/kb/PH11913
                </a>
                <br></br>
                <br></br> Chrome:
                <a href="https://support.google.com/chrome/answer/95647?hl=it-IT&hlrm=fr&hlrm=en">
                  https://support.google.com/chrome/answer/95647?hl=it-IT&hlrm=fr&hlrm=en
                </a>
                <br></br>
                <br></br>
                Firefox:
                <a href="http://support.mozilla.org/it-IT/kb/enable-and-disable-cookies-website-preferences">
                  http://support.mozilla.org/it-IT/kb/enable-and-disable-cookies-website-preferences
                </a>
                <br></br>
                <br></br>
                Per maggiori informazioni sui cookie e per gestire le tue
                preferenze sui cookie di profilazione di terza parte ti
                invitiamo a visitare{" "}
                <a href="http://www.youronlinechoices.com</a>">
                  http://www.youronlinechoices.com
                </a>
                . <br></br>
                <br></br>Per disabilitare i cookie analitici e impedire a Google
                Analytics di raccogliere dati sulla tua navigazione, puoi
                scaricare il Componente aggiuntivo del browser per la
                disattivazione di Google Analytics:{" "}
                <a href="https://tools.google.com/dlpage/gaoptout">
                  https://tools.google.com/dlpage/gaoptout
                </a>
                .
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
                6. ACCETTAZIONE DEI COOKIE
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                Ti ricordiamo che, fatto salvo quanto sopra indicato, accedendo
                al tab “Privacy Center” potrai gestire in maniera intuitiva e
                selettiva il consenso relativo ai cookie, mediante l’utilizzo di
                semplici tasti “On”/”Off”. E’ altresì considerato un valido
                consenso da parte dell’utente l’aver configurato il proprio
                Browser internet (ad es. Explorer, Firefox, Chrome, Opera) al
                fine di accettare l’utilizzo dei cookies. <br></br><br></br>Le facciamo presente
                che il suo consenso sarà richiesto solo al suo primo accesso al
                Sito: successivamente, grazie all’utilizzo di un cookie tecnico
                memorizzeremo il suo consenso per consentirle di accedere
                direttamente alle pagine del Sito al suo ritorno (resta fermo il
                suo diritto di disattivare/attivare i cookies in ogni momento o
                di cancellarli (veda paragrafo 5): in tale caso, al suo ritorno,
                il Sito richiederà nuovamente il suo consenso). <br></br><br></br>Inoltre qualora
                l’utente si registri al Sito e fornisca in sede di registrazione
                il proprio specifico consenso al monitoraggio della sua
                navigazione, i dati relativi alla navigazione all’interno del
                Sito potranno essere associati ai suoi dati personali. <br></br><br></br>In caso
                di mancata accettazione dei cookie mediante abbandono della
                navigazione, eventuali cookie già registrati localmente nel Suo
                browser rimarranno ivi registrati ma non saranno più letti né
                utilizzati da Boutique Belsito fino ad una successiva ed
                eventuale accettazione della Cookie Policy. Si avrà sempre la
                possibilità di rimuovere tali cookie in qualsiasi momento
                attraverso le modalità di cui ai siti citati nel paragrafo
                “Disattivazione/cancellazione dei cookies tramite web browser”.
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
                7. I SUOI DIRITTI
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Mediante comunicazione da inviarsi all’indirizzo e-mail
                boutiquebelsitoshop@gmail.com, lei potrà in ogni momento
                esercitare i diritti di cui agli artt. da 15 a 23 del
                Regolamento, tra cui conoscere quali dati stiamo trattando, con
                quali modalità e per quali finalità li utilizziamo, modificare i
                dati che ci ha fornito o cancellarli, chiederci di limitare
                l’uso dei suoi dati o di averne copia, ferma restando sempre la
                possibilità di cambiare i suoi consensi od opporsi all’uso dei
                suoi dati.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                8. POSSIBILITA' DI PROPORRE RECLAMO
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Le ricordiamo che, qualora non fosse soddisfatto delle risposte
                ricevute da Boutique Belsito (ai sensi del paragrafo 7 di cui
                sopra), lei potrà in ogni caso, qualora ritenga che il
                trattamento che La riguarda violi le disposizioni di cui al
                Regolamento, proporre reclamo all’autorità Garante per la
                protezione dei dati personali (www.garanteprivacy.it), oppure
                all’autorità Garante del Paese in cui risiede abitualmente,
                lavora oppure del luogo ove si è verificata la presunta
                violazione.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                9. RESPONSABILE DELLA PROTEZIONE DEI DATI (DATA PROTECTION
                OFFICER)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Responsabile della protezione dei dati, ai sensi dell’art. 37
                del Regolamento, è contattabile all’indirizzo e-mail
                boutiquebelsitoshop@gmail.com
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                10. QUALE NORMATIVA SI APPLICA AL TRATTAMENTO DEI SUOI DATI
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <div>                Il trattamento dei tuoi dati avverrà ai sensi del Regolamento UE
                679/2016 Regolamento generale sulla protezione dei dati e della
                normativa nazionale applicabile al caso di specie, nella misura
                in cui tale normativa resterà in vigore successivamente alla
                data di applicazione del Regolamento (25 maggio 2018). <br></br><br></br>Per
                maggiori informazioni in merito al trattamento dei tuoi dati
                effettuato per il tramite del Sito la invitiamo a visitare la
                pagina dedicata <Link to="/PrivacyScreen">Privacy</Link>.
                    </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </Col>
    </Row>
  );
}
