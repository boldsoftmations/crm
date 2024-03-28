import { useState, useCallback } from "react";

export const useNotificationHandling = (initialErrorMessages = []) => {
  const [errorMessages, setErrorMessages] = useState(initialErrorMessages);
  const [currentErrorIndex, setCurrentErrorIndex] = useState(0);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSuccess = useCallback((message) => {
    setAlertInfo({ open: true, message, severity: "success" });
  }, []);

  const handleError = useCallback((error) => {
    let extractedErrors = [];
    if (error.response && error.response.data && error.response.data.errors) {
      extractedErrors = extractErrorMessages(error.response.data.errors);
    } else {
      extractedErrors = ["An unexpected error occurred"];
    }
    setErrorMessages(extractedErrors);
    setAlertInfo({
      open: true,
      message: extractedErrors[0],
      severity: "error",
    });
    setCurrentErrorIndex(0);
  }, []);

  const extractErrorMessages = useCallback((errorsObj) => {
    return Object.keys(errorsObj).flatMap((key) =>
      errorsObj[key].map((error) => `${key}: ${error}`)
    );
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    const isLastMessage = currentErrorIndex >= errorMessages.length - 1;
    if (!isLastMessage) {
      setCurrentErrorIndex((currentIndex) => currentIndex + 1);
      setAlertInfo((prev) => ({
        ...prev,
        message: errorMessages[currentErrorIndex + 1],
      }));
    } else {
      setAlertInfo((prev) => ({ ...prev, open: false }));
      setCurrentErrorIndex(0);
    }
  }, [currentErrorIndex, errorMessages]);

  return {
    alertInfo,
    setAlertInfo,
    handleSuccess,
    handleError,
    handleCloseSnackbar,
  };
};
