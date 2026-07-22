package core

type PublicTimeError struct {
	IsPublicTimeError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewPublicTimeError(code string, msg string, ctx *Context) *PublicTimeError {
	return &PublicTimeError{
		IsPublicTimeError: true,
		Sdk:              "PublicTime",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *PublicTimeError) Error() string {
	return e.Msg
}
