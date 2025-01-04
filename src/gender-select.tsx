'use client'

import React, { useState } from 'react'

interface GenderSelectProps {
  value: string
  onChange: (value: string) => void
}

export default function GenderSelect({ value, onChange }: GenderSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const styles = {
    container: {
      position: 'relative',
      width: '100%',
      maxWidth: '300px',
    },
    button: {
      width: '100%',
      padding: '8px 16px',
      textAlign: 'left' as const,
      backgroundColor: 'white',
      border: '2px solid #2563eb',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    svg: {
      width: '16px',
      height: '16px',
      transition: 'transform 0.2s ease',
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    },
    dropdown: {
      position: 'absolute' as const,
      width: '100%',
      marginTop: '4px',
      backgroundColor: 'white',
      border: '2px solid #2563eb',
      borderRadius: '4px',
    },
    option: {
      width: '100%',
      padding: '8px 16px',
      textAlign: 'left' as const,
      borderBottom: '2px solid #2563eb',
      ':hover': {
        backgroundColor: '#eff6ff',
      },
    },
    lastOption: {
      borderBottom: 'none',
    },
  }

  return (
    <div style={styles.container}>
      {/* Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={styles.button}
      >
        <span>{value || "Select gender"}</span>
        <svg 
          style={styles.svg}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div style={styles.dropdown}>
          <button
            type="button"
            style={styles.option}
            onClick={() => {
              onChange('male')
              setIsOpen(false)
            }}
          >
            Male
          </button>
          <button
            type="button"
            style={{...styles.option, ...styles.lastOption}}
            onClick={() => {
              onChange('female')
              setIsOpen(false)
            }}
          >
            Female
          </button>
        </div>
      )}
    </div>
  )
}

