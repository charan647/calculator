"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [memory, setMemory] = useState(0)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const clearEntry = () => {
    setDisplay("0")
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return secondValue !== 0 ? firstValue / secondValue : 0
      case "^":
        return Math.pow(firstValue, secondValue)
      case "mod":
        return firstValue % secondValue
      default:
        return secondValue
    }
  }

  const performScientificOperation = (func: string) => {
    const inputValue = Number.parseFloat(display)
    let result: number

    switch (func) {
      case "sin":
        result = Math.sin((inputValue * Math.PI) / 180)
        break
      case "cos":
        result = Math.cos((inputValue * Math.PI) / 180)
        break
      case "tan":
        result = Math.tan((inputValue * Math.PI) / 180)
        break
      case "log":
        result = Math.log10(inputValue)
        break
      case "ln":
        result = Math.log(inputValue)
        break
      case "sqrt":
        result = Math.sqrt(inputValue)
        break
      case "x²":
        result = inputValue * inputValue
        break
      case "1/x":
        result = inputValue !== 0 ? 1 / inputValue : 0
        break
      case "x!":
        result = factorial(inputValue)
        break
      case "π":
        result = Math.PI
        break
      case "e":
        result = Math.E
        break
      case "±":
        result = -inputValue
        break
      default:
        result = inputValue
    }

    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  const factorial = (n: number): number => {
    if (n < 0 || n !== Math.floor(n)) return Number.NaN
    if (n === 0 || n === 1) return 1
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }

  const memoryOperation = (op: string) => {
    const inputValue = Number.parseFloat(display)

    switch (op) {
      case "MC":
        setMemory(0)
        break
      case "MR":
        setDisplay(String(memory))
        setWaitingForOperand(true)
        break
      case "MS":
        setMemory(inputValue)
        break
      case "M+":
        setMemory(memory + inputValue)
        break
      case "M-":
        setMemory(memory - inputValue)
        break
    }
  }

  const handleEquals = () => {
    const inputValue = Number.parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Scientific Calculator</h1>
          <p className="text-muted-foreground">Advanced mathematical operations</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-center">
              <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-right text-2xl min-h-[60px] flex items-center justify-end border">
                {display}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Memory Functions Row */}
            <div className="grid grid-cols-5 gap-2">
              {["MC", "MR", "MS", "M+", "M-"].map((btn) => (
                <Button
                  key={btn}
                  variant="outline"
                  className="h-12 text-sm bg-muted hover:bg-muted/80"
                  onClick={() => memoryOperation(btn)}
                >
                  {btn}
                </Button>
              ))}
            </div>

            {/* Scientific Functions Row 1 */}
            <div className="grid grid-cols-5 gap-2">
              {["sin", "cos", "tan", "log", "ln"].map((btn) => (
                <Button
                  key={btn}
                  variant="outline"
                  className="h-12 text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  onClick={() => performScientificOperation(btn)}
                >
                  {btn}
                </Button>
              ))}
            </div>

            {/* Scientific Functions Row 2 */}
            <div className="grid grid-cols-5 gap-2">
              {["x²", "sqrt", "1/x", "x!", "^"].map((btn) => (
                <Button
                  key={btn}
                  variant="outline"
                  className="h-12 text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  onClick={() => (btn === "^" ? performOperation(btn) : performScientificOperation(btn))}
                >
                  {btn === "sqrt" ? "√" : btn}
                </Button>
              ))}
            </div>

            {/* Constants and Clear Row */}
            <div className="grid grid-cols-5 gap-2">
              <Button
                variant="outline"
                className="h-12 text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80"
                onClick={() => performScientificOperation("π")}
              >
                π
              </Button>
              <Button
                variant="outline"
                className="h-12 text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80"
                onClick={() => performScientificOperation("e")}
              >
                e
              </Button>
              <Button
                variant="outline"
                className="h-12 text-sm bg-destructive text-destructive-foreground hover:bg-destructive/80"
                onClick={clear}
              >
                C
              </Button>
              <Button
                variant="outline"
                className="h-12 text-sm bg-destructive text-destructive-foreground hover:bg-destructive/80"
                onClick={clearEntry}
              >
                CE
              </Button>
              <Button
                variant="outline"
                className="h-12 text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80"
                onClick={() => performScientificOperation("±")}
              >
                ±
              </Button>
            </div>

            {/* Number Pad and Operations */}
            <div className="grid grid-cols-4 gap-2">
              {/* Row 1 */}
              <Button variant="outline" className="h-12 bg-card hover:bg-card/80" onClick={() => inputNumber("7")}>
                7
              </Button>
              <Button variant="outline" className="h-12 bg-card hover:bg-card/80" onClick={() => inputNumber("8")}>
                8
              </Button>
              <Button variant="outline" className="h-12 bg-card hover:bg-card/80" onClick={() => inputNumber("9")}>
                9
              </Button>
              <Button
                variant="outline"
                className="h-12 bg-primary text-primary-foreground hover:bg-primary/80"
                onClick={() => performOperation("÷")}
              >
                ÷
              </Button>

              {/* Row 2 */}
              <Button variant="outline" className="h-12 bg-card hover:bg-card/80" onClick={() => inputNumber("4")}>
                4
              </Button>
              <Button variant="outline" className="h-12 bg-card hover:bg-card/80" onClick={() => inputNumber("5")}>
                5
              </Button>
              <Button variant="outline" className="h-12 bg-card hover:bg-card/80" onClick={() => inputNumber("6")}>
                6
              </Button>
              <Button
                variant="outline"
                className="h-12 bg-primary text-primary-foreground hover:bg-primary/80"
                onClick={() => performOperation("×")}
              >
                ×
              </Button>

              {/* Row 3 */}
              <Button variant="outline" className="h-12 bg-card hover:bg-card/80" onClick={() => inputNumber("1")}>
                1
              </Button>
              <Button variant="outline" className="h-12 bg-card hover:bg-card/80" onClick={() => inputNumber("2")}>
                2
              </Button>
              <Button variant="outline" className="h-12 bg-card hover:bg-card/80" onClick={() => inputNumber("3")}>
                3
              </Button>
              <Button
                variant="outline"
                className="h-12 bg-primary text-primary-foreground hover:bg-primary/80"
                onClick={() => performOperation("-")}
              >
                -
              </Button>

              {/* Row 4 */}
              <Button
                variant="outline"
                className="h-12 col-span-2 bg-card hover:bg-card/80"
                onClick={() => inputNumber("0")}
              >
                0
              </Button>
              <Button variant="outline" className="h-12 bg-card hover:bg-card/80" onClick={inputDecimal}>
                .
              </Button>
              <Button
                variant="outline"
                className="h-12 bg-primary text-primary-foreground hover:bg-primary/80"
                onClick={() => performOperation("+")}
              >
                +
              </Button>
            </div>

            {/* Equals and Modulo */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="h-12 bg-primary text-primary-foreground hover:bg-primary/80"
                onClick={() => performOperation("mod")}
              >
                mod
              </Button>
              <Button className="h-12 bg-accent text-accent-foreground hover:bg-accent/80" onClick={handleEquals}>
                =
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
