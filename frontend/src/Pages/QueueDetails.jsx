import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, Box, Modal, TextField, Rating } from "@mui/material";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

// Complete Services array with names and descriptions
const services = [
  {
    id: 1,
    name: "Mobile Services",
    description: "Voice, data plans, SIM card services, and device sales.",
  },
  {
    id: 2,
    name: "Mobile Money (MoMo)",
    description: "Money transfers, bill payments, and MoMoPay for businesses.",
  },
  {
    id: 3,
    name: "Internet Services",
    description: "Broadband internet, WiFi routers, and IoT solutions.",
  },
  {
    id: 4,
    name: "Enterprise Solutions",
    description: "Corporate plans, bulk SMS, and business MoMo services.",
  },
  {
    id: 5,
    name: "Customer Support",
    description: "Support for technical issues, device setup, and account inquiries.",
  },
  {
    id: 6,
    name: "Digital & VAS",
    description: "Entertainment, e-learning, insurance, and health services.",
  },
];

// QueueDetails Component
const QueueDetails = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [queueInfo, setQueueInfo] = useState({ peopleInFront: 0, waitingTime: 0 });
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const goBack = () => {
    navigate(-1);
  };

  const handleJoinQueue = (service) => {
    setSelectedService(service);
    const randomPeople = Math.floor(Math.random() * 20) + 1;
    const randomTime = randomPeople * 3; // Each person takes approx. 3 minutes
    setQueueInfo({ peopleInFront: randomPeople, waitingTime: randomTime });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFeedbackOpen(true); // Open feedback form when queue modal is closed
  };

  const handleFeedbackSubmit = () => {
    console.log("Rating:", rating);
    console.log("Feedback:", feedback);
    setFeedbackOpen(false);
    setRating(0);
    setFeedback("");
  };

  return (
    <>
      <Header />
      <section className="bg-gray-100">
        <div className="p-5">
          <button
            className="absolute flex items-center bg-slate-800 border-none py-1 px-3 cursor-pointer rounded-md text-white"
            onClick={goBack}
          >
            Back
          </button>
          <h1 className="text-3xl">MTN Service</h1>
        </div>
      </section>
      
      <section className="flex flex-col items-center bg-gray-100">
        {services.map((service) => (
          <Card
            key={service.id}
            sx={{
              width: "100%",
              maxWidth: 800,
              padding: "20px",
              margin: "10px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardContent style={{ textAlign: "center" }}>
              <Typography variant="h6" component="div" gutterBottom>
                {service.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {service.description}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleJoinQueue(service)}
              >
                Join Queue
              </Button>
            </Box>
          </Card>
        ))}
      </section>

      {/* Queue Status Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: 400, padding: 4, margin: "100px auto", backgroundColor: "white", borderRadius: "8px", textAlign: "center" }}>
          <Typography variant="h6" component="div" gutterBottom>
            {selectedService?.name} Queue Status
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            People in front of you: {queueInfo.peopleInFront}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Estimated waiting time: {queueInfo.waitingTime} minutes
          </Typography>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>

      {/* Feedback Modal */}
      <Modal open={feedbackOpen} onClose={() => setFeedbackOpen(false)}>
        <Box sx={{ width: 400, padding: 4, margin: "100px auto", backgroundColor: "white", borderRadius: "8px", textAlign: "center" }}>
          <Typography variant="h6" component="div" gutterBottom>
            Rate Our Service
          </Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Feedback"
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleFeedbackSubmit}>
            Submit Feedback
          </Button>
        </Box>
      </Modal>
      <Footer />
    </>
  );
};

export default QueueDetails;