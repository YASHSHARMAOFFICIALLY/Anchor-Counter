use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Count cannot be less than zero")]
    NegativeCountNotPossible,
}
