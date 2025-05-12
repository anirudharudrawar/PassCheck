
"use client";

import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface StrengthDetails {
  score: number; // 0-100
  level: 'Too Weak' | 'Weak' | 'Medium' | 'Strong' | 'Very Strong' | '';
  suggestions: Array<{ text: string; met: boolean }>;
  colorVar: string; // CSS variable name e.g. '--strength-weak-val'
  activeSegments: number; // Number of segments to light up in the bar
}

const initialStrengthDetails: StrengthDetails = {
  score: 0,
  level: '',
  suggestions: [
    { text: 'At least 12 characters', met: false },
    { text: 'At least 16 characters (strongly recommended)', met: false },
    { text: 'Contains uppercase letters (A-Z)', met: false },
    { text: 'Contains lowercase letters (a-z)', met: false },
    { text: 'Contains numbers (0-9)', met: false },
    { text: 'Contains symbols (e.g., !@#$%)', met: false },
  ],
  colorVar: '--muted',
  activeSegments: 0,
};

export function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strengthDetails, setStrengthDetails] = useState<StrengthDetails>(initialStrengthDetails);

  useEffect(() => {
    if (password === '') {
      setStrengthDetails(initialStrengthDetails);
      return;
    }

    let score = 0;
    const suggestions = [...initialStrengthDetails.suggestions].map(s => ({...s, met: false}));

    // Length
    suggestions[0].met = password.length >= 12;
    suggestions[1].met = password.length >= 16;
    if (password.length >= 12) {
      score += 20;
    }
    if (password.length >= 16) {
      score += 10; // Bonus for 16+
    }

    // Uppercase
    suggestions[2].met = /[A-Z]/.test(password);
    if (suggestions[2].met) {
      score += 15;
    }
    
    // Lowercase
    suggestions[3].met = /[a-z]/.test(password);
    if (suggestions[3].met) {
      score += 15;
    }

    // Numbers
    suggestions[4].met = /[0-9]/.test(password);
    if (suggestions[4].met) {
      score += 15;
    }

    // Symbols
    suggestions[5].met = /[^a-zA-Z0-9]/.test(password);
    if (suggestions[5].met) {
      score += 25; // Symbols are heavily weighted
    }
    
    score = Math.min(score, 100); // Cap score at 100

    let level: StrengthDetails['level'] = '';
    let colorVar: string = '--muted';
    let activeSegments: number = 0;

    if (score < 40) { // Covers passwords > 0 length but very low score
      level = 'Too Weak';
      colorVar = '--strength-weak-val';
      activeSegments = 1;
    } else if (score < 60) {
      level = 'Weak';
      colorVar = '--strength-weak-val'; // Still red for weak
      activeSegments = 2;
    } else if (score < 80) {
      level = 'Medium';
      colorVar = '--strength-medium-val';
      activeSegments = 3;
    } else if (score < 100) {
      level = 'Strong';
      colorVar = '--strength-strong-val';
      activeSegments = 4;
    } else { // score === 100
      level = 'Very Strong';
      colorVar = '--strength-very-strong-val';
      activeSegments = 4;
    }
    
    // If password has content but doesn't meet the minimum 12 char length criteria, it's Too Weak.
    // This is implicitly handled by score calculation (score will be low if length < 12).
    // Example: "short" score will be (0 for length) + (15 for LC) = 15. Falls into < 40.
    // Example: "a" score will be (0 for length) + (15 for LC) = 15. Falls into < 40.

    setStrengthDetails({ score, level, suggestions, colorVar, activeSegments });

  }, [password]);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <div className="flex items-center space-x-2 mb-2">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <CardTitle className="text-3xl font-bold">PassCheck</CardTitle>
        </div>
        <CardDescription className="text-md">
          Enter a password to analyze its strength and get suggestions for improvement.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className="pr-10 text-lg"
                aria-label="Password input"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={toggleShowPassword}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {password.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-foreground">Strength: {strengthDetails.level}</span>
                <span className="text-sm text-muted-foreground">{strengthDetails.score}/100</span>
              </div>
              <div className="flex w-full space-x-1 h-3 rounded-full overflow-hidden bg-muted/50">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-full flex-1 first:rounded-l-full last:rounded-r-full transition-all duration-300 ease-in-out`}
                    style={{
                      backgroundColor: index < strengthDetails.activeSegments
                        ? `hsl(var(${strengthDetails.colorVar}))`
                        : `hsl(var(--muted))`,
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          )}

          {password.length > 0 && strengthDetails.suggestions.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">Suggestions:</h3>
              <ul className="space-y-1.5">
                {strengthDetails.suggestions.map((suggestion, index) => (
                  <li key={index} className={`flex items-center text-sm ${suggestion.met ? 'text-foreground' : 'text-muted-foreground opacity-75'}`}>
                    {suggestion.met ? (
                      <CheckCircle2 className="mr-2 h-4 w-4 text-strength-strong shrink-0" style={{color: 'hsl(var(--strength-strong-val))'}} />
                    ) : (
                      <XCircle className="mr-2 h-4 w-4 text-strength-weak shrink-0" style={{color: 'hsl(var(--strength-weak-val))'}} />
                    )}
                    {suggestion.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
