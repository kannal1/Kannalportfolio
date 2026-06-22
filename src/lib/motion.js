// Single motion language, shared by Home, CaseStudy, and Motion primitives.
// Two eases, three durations, two spring profiles. Over-damped, zero overshoot:
// fintech motion must read as careful, never playful.
export const EO = [0.16, 1, 0.3, 1]        // decelerate — entrances / settles
export const ES = [0.22, 0.61, 0.36, 1]    // standard — state changes
export const DUR = { fast: 0.24, base: 0.7, slow: 1.1 }

// big, slow parallax (act numbers, covers, image drift)
export const SPRING_DRIFT = { stiffness: 60, damping: 24, mass: 0.6 }
// tracking content (headlines, impact rows, the horizontal work track)
export const SPRING_GLIDE = { stiffness: 90, damping: 28, mass: 0.4 }
