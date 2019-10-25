export function generique_dispatch_no_param(dispatch, f, e) {
    return () => { dispatch(f(e)) }
}
