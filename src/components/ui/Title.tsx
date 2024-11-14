import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useChatStore } from '@/chat/store/chatStore';

type TypewriterTextProps = {
  text: string;
  speed?: number;
};

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");

    const timeoutIds = text.split("").map((_, i) =>
      setTimeout(() => setDisplayedText((prev) => prev + text[i]), i * speed)
    );

    return () => timeoutIds.forEach((id) => clearTimeout(id));
  }, [text, speed]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.4 }}

      >
        &nbsp;
      </motion.span>
    </motion.div>
  );
};


const Title: React.FC = () => {
  const pdfName = useChatStore(state => state.pdfName);
  return (
    <div className='text-3xl text-white font-semibold'>
      <TypewriterText text="¿En qué puedo ayudarte?" />
      {
        pdfName ?
          <small className='text-sm'>PDF seleccionado: {pdfName}</small>
          : <small className='text-sm'>Ingrese un PDF para hacer preguntas respecto al mismo</small>
      }

    </div>
  );
};

export default Title;
