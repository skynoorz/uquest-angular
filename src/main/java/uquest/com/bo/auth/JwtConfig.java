package uquest.com.bo.auth;

public class JwtConfig {
    public static final String LLAVE_SECRETA="alguna.clave.secreta.12345678";

    public static final String RSA_PRIVATE = "-----BEGIN RSA PRIVATE KEY-----\n" +
            "MIIEpgIBAAKCAQEAzCuIZmKCFsPr5blPFMfCdL21cfZ2v2FQcmk1xF7i13LzPpjb\n" +
            "EgDY0XhJGB4xc4YTN+HQm9M1ivod6EP+1LfWHevwlk+W8q+WTPs2hvMTxtk1/WyP\n" +
            "wCJ00bV6ymMEgzbxpEOCdmiZEh6PmLbAnUtCzuQkSNKm1MdX0IL84q2f0LwUctFc\n" +
            "Hz+aT+LwX0u0W9UOx9qvMOTdIi9nr3Z1xkX9ipd8hO9bAaKFNVtzhv/AnTbsfnvz\n" +
            "QnULGyTfG6B8RdjsratQnMsHhFK1RqOtv7ccaTI4Ojs+LgTgntV1wSttstABmlk/\n" +
            "yeudWyHoE3ky3nAaFVqFpgwXpZVZvP9lLMeBiwIDAQABAoIBAQCfiJCPN//gW/zS\n" +
            "xwaE/UXzxFyoDOZiyl5617zckSv9H2P0EKp1GdZRbwTmZIlNdIFF1BwV9mZLDv8Z\n" +
            "gy/29SLIxJh8Svpu7UarJkxIDF3yrb0jJZX5krLnPkARLmfTQ7ZzHREvBrI810Zr\n" +
            "FLnS7oDoepnjkT4s2wrB8eg6E2LiTP4eiJKigTKR4FsVBuzfiuTWXdBuSwdtiWnt\n" +
            "tLAnf/6AYTC3P8ezdyNmRVhXVL8x2RJ9qjYHB8qxZOiip7eShMhIqqtfFJjoQf8Q\n" +
            "9SNeLq7lI2i4u/DZ7tFiK1t7O+27+xkdw/O7OVMHLuKkG8v4E174/TGnes8ng1yE\n" +
            "62oR0vipAoGBAPVIx63dPTPFiFM03e1f6JvVVsu1qH4gYV66aNbVZZTesadONjU0\n" +
            "Mp13I5Z7wkLRG7JEYJ9TYnhKGmY5P4Op9UGo71NYdLYvI1Vcn89/Pjt1SSfCqy8z\n" +
            "/z0Zd6DxYaovdHMYt6ET9CoFJpzOFJUAoH+Mg1UP5rxd7N1pKQd8YaEnAoGBANUW\n" +
            "8A3qZ9ZcRHaJHfyfT6J6SHcODsaJOMitjX00tsQkvjq2tpfmtV+rf27Mxpb0c/M9\n" +
            "ozsDFb6MRmWCh2SrNHHgVLovWyRU1ens0tcU3VXu3/EOjYk4hc9EsbaaoWQXIKQ7\n" +
            "tVGrINO2HXqZB/j539NXvk5SqlwpxAz3NX/SZZL9AoGBAMV033oxfhFtVT9Wccmj\n" +
            "yceZSJQZGxjdzETL35YCmBHt7Cn5Jl5SNOTaggWkf0/2sksiDH52S/D2BqaAM4c0\n" +
            "jMFc07zOmrYG4HTZabVKg7itxESDy/bl7vUqyUkAyFSOezokjb7YJ1ikaN8Wby88\n" +
            "H/hOD3Osp1zAZ+wdue/Sy21FAoGBAJSakn6h4hhT8EraBNeQInEk5jRg0V0ThU4t\n" +
            "+mY+xNa06RT5Jw14DzTQ3OXgWP4dLF+NtLAKzrc8DDvuc4149/ISiAPv0pfbsfKY\n" +
            "/dCQ9GphVDs/8uSnTmnldinqXHL4zgK6wRBbT2FVt+kvn6e6WqWAo27rp3LujZKd\n" +
            "M+oYSE3hAoGBAIXzxfm619TrgmX2/9oiiRm0FbkMu1vQ417GXanb6YmGxpKRfNsY\n" +
            "Nx6kVx8MqJmut26xb3f1VDMbrq4D9PM4GJa95Qo+bUEG1wzmOvDLFvUTQk08cQBH\n" +
            "9BPPnwyFYNUG8xaF6L0yaVd55vUP4GRU9HylV7Fhlxu6HvGmmQD826up\n" +
            "-----END RSA PRIVATE KEY-----";
    public static final String RSA_PUBLICA = "-----BEGIN PUBLIC KEY-----\n" +
            "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzCuIZmKCFsPr5blPFMfC\n" +
            "dL21cfZ2v2FQcmk1xF7i13LzPpjbEgDY0XhJGB4xc4YTN+HQm9M1ivod6EP+1LfW\n" +
            "Hevwlk+W8q+WTPs2hvMTxtk1/WyPwCJ00bV6ymMEgzbxpEOCdmiZEh6PmLbAnUtC\n" +
            "zuQkSNKm1MdX0IL84q2f0LwUctFcHz+aT+LwX0u0W9UOx9qvMOTdIi9nr3Z1xkX9\n" +
            "ipd8hO9bAaKFNVtzhv/AnTbsfnvzQnULGyTfG6B8RdjsratQnMsHhFK1RqOtv7cc\n" +
            "aTI4Ojs+LgTgntV1wSttstABmlk/yeudWyHoE3ky3nAaFVqFpgwXpZVZvP9lLMeB\n" +
            "iwIDAQAB\n" +
            "-----END PUBLIC KEY-----";
}
