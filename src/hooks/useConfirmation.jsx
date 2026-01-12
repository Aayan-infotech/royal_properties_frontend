import { useState } from 'react';

export const useConfirmation = () => {
  const [confirmationState, setConfirmationState] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    itemDetails: null,
    apiEndpoint: null,
    itemId: null,
    additionalData: null
  });

  const showConfirmation = ({
    title = "Are you sure?",
    message = "This action cannot be undone.",
    onConfirm,
    itemDetails = null,
    apiEndpoint = null,
    itemId = null,
    additionalData = null
  }) => {
    setConfirmationState({
      isOpen: true,
      title,
      message,
      onConfirm,
      itemDetails,
      apiEndpoint,
      itemId,
      additionalData
    });
  };

  const hideConfirmation = () => {
    setConfirmationState(prev => ({ ...prev, isOpen: false }));
  };

  return {
    confirmationState,
    showConfirmation,
    hideConfirmation
  };
};