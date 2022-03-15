/**
 * load mixpanel library
 * @param libUrl mixpanel lib url
 */
export function loadMixpanel(libUrl = '//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js') {
    const script = document.createElement('script');
    const w = window as any;

    const methods = ('disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group'
        + ' register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking'
        + ' has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment'
        + ' people.append people.union people.track_charge people.clear_charges people.delete_user people.remove').split(' ');

    const mp: any = [];

    mp._i = [];
    mp.__SV = 1.2;

    mp.init = (token: string, config?: Mixpanel.Config, libraryName?: string): any => {
        function bind(obj: any, method: string) {
            if (method.indexOf('.') > 0) {
                const [key, m] = method.split('.');
                obj = obj[key];
                method = m;
            }

            obj[method] = (...args: any[]) => {
                obj.push([method].concat(args));
            }
        }

        let current = mp as any;
        current.people = current.people || [];

        if (libraryName) {
            current = (mp as any)[libraryName] = [];
        } else {
            libraryName = 'mixpanel';
        }

        current.toString = (root = false): string => {
            let str = 'mixpanel';

            if (libraryName !== 'mixpanel') {
                str += '.' + libraryName;
            }

            if (!root) {
                str += ' (stub)';
            }

            return str;
        };

        current.people.toString = () => {
            return current.toString(true) + '.people (stub)';
        };

        methods.forEach(method => bind(current, method));
        const groupMethods = 'set set_once union unset remove delete'.split(' ');

        current.get_group = (...args: any[]) => {
            const group: Record<string, any> = {};
            const call = ['get_group'].concat(args);

            function bindGroup(method: string) {
                group[method] = (...args: any[]) => {
                    const params = [method].concat(args);
                    current.push(call, params);
                };
            }

            groupMethods.forEach(method => bindGroup(method));

            return group;
        };

        mp._i.push([token, config, libraryName]);
    };

    w.mixpanel = mp;

    script.async = true;
    script.src = libUrl;
    document.head.append(script);
}
