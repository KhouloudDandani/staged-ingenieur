
import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';

const MailingPage = () => {
  const [emailContent, setEmailContent] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmailContent(event.target.value);
  };

  const handleRecipientEmailChange = (event) => {
    setRecipientEmail(event.target.value);
  };

  const handleSendEmail = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: recipientEmail,
          subject: 'Subject of the email',
          content: emailContent,
        }),
      });

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error sending email:', error.message);
      // Show an error message to the user
    }

    // Réinitialisez le contenu de l'e-mail après l'envoi
    setEmailContent('');
    setRecipientEmail('');
  };

  return (
    <div>
      <div style={{ marginTop: '75px' }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'green' }}>
          Page de réclamation
        </Typography>
        <TextField
          label="Adresse e-mail du destinataire"
          fullWidth
          variant="outlined"
          value={recipientEmail}
          onChange={handleRecipientEmailChange}
        />
        <TextField
          label="Contenu de l'e-mail"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={emailContent}
          onChange={handleEmailChange}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Button
          variant="contained"
          color="success"  // Vous pouvez utiliser "success" pour la couleur verte
          onClick={handleSendEmail}
        >
          Envoyer l'e-mail
        </Button>
      </div>
    </div>
  );
};

export default MailingPage;