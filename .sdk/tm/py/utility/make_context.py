# PublicTime SDK utility: make_context

from core.context import PublicTimeContext


def make_context_util(ctxmap, basectx):
    return PublicTimeContext(ctxmap, basectx)
