import '@testing-library/jest-dom/vitest'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FAQAccordion from './FAQAccordion'

describe('FAQAccordion', () => {
  beforeEach(() => {
    // FAQAccordion has no localStorage deps
  })

  it('renders the FAQ section title', () => {
    render(<FAQAccordion />)
    expect(screen.getByText('Perguntas Frequentes')).toBeTruthy()
  })

  it('renders all 5 FAQ questions as buttons', () => {
    render(<FAQAccordion />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(5)
  })

  it('no answers visible initially', () => {
    render(<FAQAccordion />)
    // No .faq-answer elements in DOM before clicking
    const answers = document.querySelectorAll('.faq-answer')
    expect(answers.length).toBe(0)
  })

  it('clicking first question reveals its answer', () => {
    render(<FAQAccordion />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    const answers = document.querySelectorAll('.faq-answer')
    expect(answers.length).toBe(1)
    expect(answers[0]).toHaveTextContent(/custos fixos mensais/)
  })

  it('clicking same question again closes it', () => {
    render(<FAQAccordion />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(document.querySelectorAll('.faq-answer').length).toBe(1)
    fireEvent.click(buttons[0])
    expect(document.querySelectorAll('.faq-answer').length).toBe(0)
  })

  it('clicking second question closes first (single-open)', () => {
    render(<FAQAccordion />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(document.querySelectorAll('.faq-answer').length).toBe(1)
    fireEvent.click(buttons[1])
    // Second opens, first closes — still only 1 answer
    expect(document.querySelectorAll('.faq-answer').length).toBe(1)
    expect(document.querySelector('.faq-answer')).toHaveTextContent(/3 cálculos gratuitos/)
  })

  it('second answer mentions R$ 9,90 and R$ 29/mês', () => {
    render(<FAQAccordion />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[1])
    const answer = document.querySelector('.faq-answer')
    expect(answer).toHaveTextContent(/R\$ 9,90/)
    expect(answer).toHaveTextContent(/R\$ 29\/mês/)
  })

  it('chevron gets open class when question is expanded', () => {
    render(<FAQAccordion />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(buttons[0].querySelector('.faq-chevron.open')).toBeTruthy()
  })

  it('chevron loses open class when question is collapsed', () => {
    render(<FAQAccordion />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(buttons[0].querySelector('.faq-chevron.open')).toBeTruthy()
    fireEvent.click(buttons[0])
    expect(buttons[0].querySelector('.faq-chevron.open')).toBeFalsy()
  })

  it('each FAQ button has exactly one chevron span', () => {
    render(<FAQAccordion />)
    const buttons = screen.getAllByRole('button')
    buttons.forEach(btn => {
      expect(btn.querySelectorAll('.faq-chevron').length).toBe(1)
    })
  })
})
