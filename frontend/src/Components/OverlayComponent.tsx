import React from "react";
import styled from "styled-components";

// Overlay background with fixed positioning and full-screen coverage
export const OverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); // Semi-transparent black background
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; // Ensure it's above other content
`;

// Container for the passed component that can overflow and scroll
export const OverlayContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  max-height: 80%;
  overflow: auto; // Allow scroll if the content overflows
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface OverlayComponentProps {
  children: React.ReactNode;
  onClose: () => void; // Function to close the overlay
}

const OverlayComponent: React.FC<OverlayComponentProps> = ({ children, onClose }) => {
  return (
    <OverlayWrapper onClick={onClose}>
      <OverlayContent onClick={(e) => e.stopPropagation()}> {/* Prevent close on inner click */}
        {children}
      </OverlayContent>
    </OverlayWrapper>
  );
};

export default OverlayComponent;
